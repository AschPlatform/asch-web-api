import * as Bip39 from 'bip39'
import * as sha256 from 'fast-sha256'
import * as RIPEMD160 from 'ripemd160'
import * as nacl from 'tweetnacl'
import * as ByteBuffer from 'bytebuffer'

import { Transaction, Keys, ObjectType, Account } from './type'

type Bytes = string | Uint8Array
const NORMAL_PREFIX = 'A'
const ONE_XAS = 100000000
const EPOCHTIME = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0))
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

let ALPHABET_MAP: ObjectType = {}
let BASE = ALPHABET.length
let LEADER = ALPHABET.charAt(0)

// pre-compute lookup table
for (let z = 0; z < ALPHABET.length; z++) {
  let x = ALPHABET.charAt(z)

  if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
  ALPHABET_MAP[x] = z
}

function sha256Bytes(data: Uint8Array) {
  return sha256.hash(data)
}

function getHash(
  transaction: Transaction,
  skipSignature: boolean = false,
  skipSecondSignature: boolean = false
) {
  return sha256Bytes(getBytes(transaction))
}

function getBytes(
  trs: Transaction,
  skipSignature: boolean = false,
  skipSecondSignature: boolean = false
) {
  let bb = new ByteBuffer(1, true)
  bb.writeInt(trs.type)
  bb.writeInt(trs.timestamp)
  bb.writeLong(trs.fee)
  bb.writeString(trs.senderId)
  if (trs.message) bb.writeString(trs.message)
  if (trs.args) {
    let args: string | undefined
    if (typeof trs.args === 'string') {
      args = trs.args
    } else if (Array.isArray(trs.args)) {
      args = JSON.stringify(trs.args)
    }
    if (args != undefined && args.length > 0) {
      bb.writeString(args)
    }
  }

  if (!skipSignature && trs.signatures) {
    for (let signature of trs.signatures) {
      let signatureBuffer = new Buffer(signature, 'hex')
      for (let idx = 0; idx < signatureBuffer.length; idx++) {
        bb.writeByte(signatureBuffer[idx])
      }
    }
  }

  if (!skipSecondSignature && trs.secondSignature) {
    let signSignatureBuffer = new Buffer(trs.secondSignature, 'hex')
    for (let idx = 0; idx < signSignatureBuffer.length; idx++) {
      bb.writeByte(signSignatureBuffer[idx])
    }
  }

  bb.flip()
  return toLocalBuffer(bb)

  // const buf = Buffer.from('123456')
  // return new Uint8Array(buf)
}

function sign(transaction: Transaction, secret: string): Transaction {
  let hash = getHash(transaction)
  let keys = getKeys(secret)
  let signature = nacl.sign.detached(hash, keys.keypair.secretKey)
  let signStr = new Buffer(signature).toString('hex')
  if (transaction.signatures == null) transaction.signatures = new Array<string>()
  transaction.signatures!.push(signStr)
  return transaction
}

function secondSign(transaction: Transaction, secret: string): Transaction {
  let hash = getHash(transaction)
  let keys = getKeys(secret)
  let signature = nacl.sign.detached(hash, keys.keypair.secretKey)
  let signStr = new Buffer(signature).toString('hex')
  transaction.secondSignature = signStr
  return transaction
}

/**
 * 所有交易的签名函数
 * @param unsignedTrx
 */
function fullSign(unsignedTrx: Transaction, secret: string, secondSecret: string): Transaction {
  //console.log('secret:'+secret)
  let keys: Keys = getKeys(secret)
  // console.log('Keys:' + JSON.stringify(keys))
  //let publicKey =utils.getKeys(this.secret).publicKey
  //let address = utils.getAddressByPublicKey(publicKey)
  unsignedTrx.senderPublicKey = keys.publicKey
  unsignedTrx.senderId = getAddressByPublicKey(keys.publicKey)
  let trx = sign(unsignedTrx, secret)
  if (secondSecret != null && secondSecret.length > 0) {
    trx = secondSign(trx, secondSecret)
  }
  trx.id = new Buffer(getId(trx)).toString('hex')
  return trx
}

function getKeys(secret: string): Keys {
  let hash = sha256Bytes(new Buffer(secret))
  //console.log('get keys hash:'+hash)
  let keypair = nacl.sign.keyPair.fromSeed(hash)
  //console.log('get keys keypair:'+JSON.stringify(keypair))
  return {
    keypair,
    publicKey: new Buffer(keypair.publicKey).toString('hex'),
    privateKey: new Buffer(keypair.secretKey).toString('hex')
  }
}

function toLocalBuffer(buf: any) {
  if (typeof window !== 'undefined') {
    return new Uint8Array(buf.toArrayBuffer())
  } else {
    return buf.toBuffer()
  }
}

function signBytes(bytes: string, keys: Keys): string {
  let hash = sha256Bytes(new Buffer(bytes, 'hex'))
  let signature = nacl.sign.detached(hash, keys.keypair.secretKey)
  return new Buffer(signature).toString('hex')
}

// todo
function verify(transaction: Transaction): boolean {
  let remove = 64
  if (transaction.signSignature) {
    remove = 128
  }

  let bytes = getBytes(transaction)
  let data2 = new Buffer(bytes.length - remove)

  for (let idx = 0; idx < data2.length; idx++) {
    data2[idx] = bytes[idx]
  }

  let hash = sha256Bytes(data2)

  let signatureBuffer = new Buffer(transaction.signatures![0], 'hex')
  let senderPublicKeyBuffer = new Buffer(transaction.senderPublicKey, 'hex')
  let res = nacl.sign.detached.verify(hash, signatureBuffer, senderPublicKeyBuffer)

  return res
}

function verifyBytes(bytes: string, signature: string, publicKey: string): boolean {
  let hash = sha256Bytes(new Buffer(bytes, 'hex'))
  let signatureBuffer = new Buffer(signature, 'hex')
  let publicKeyBuffer = new Buffer(publicKey, 'hex')
  let res = nacl.sign.detached.verify(hash, signatureBuffer, publicKeyBuffer)
  return res
}

// function hash(bytes: Bytes): string {
//   return ''
// }

function getId(transaction: Transaction): Uint8Array {
  return sha256Bytes(getBytes(transaction))
}

function base58DecodeUnsafe(str: string) {
  if (str.length === 0) return Buffer.allocUnsafe(0)

  let bytes = [0]
  for (let idx = 0; idx < str.length; idx++) {
    let value = ALPHABET_MAP[str[idx]]
    if (value === undefined) return
    let carry = value
    for (let j = 0; j < bytes.length; ++j) {
      carry += bytes[j] * BASE
      bytes[j] = carry & 0xff
      carry >>= 8
    }

    while (carry > 0) {
      bytes.push(carry & 0xff)
      carry >>= 8
    }
  }

  // deal with leading zeros
  for (let k = 0; str[k] === LEADER && k < str.length - 1; ++k) {
    bytes.push(0)
  }
  return Buffer.from(bytes.reverse())
}

function base58Encode(payload: Uint8Array) {
  let checksum = Buffer.from(sha256Bytes(sha256Bytes(payload)))
  let source = Buffer.concat([payload, checksum], payload.length + 4)
  if (source.length === 0) return ''

  let digits = [0]
  for (let i = 0; i < source.length; ++i) {
    let carry = source[i]
    for (let j = 0; j < digits.length; ++j) {
      carry += digits[j] << 8
      digits[j] = carry % BASE
      carry = (carry / BASE) | 0
    }

    while (carry > 0) {
      digits.push(carry % BASE)
      carry = (carry / BASE) | 0
    }
  }

  let str = ''

  // deal with leading zeros
  for (let k = 0; source[k] === 0 && k < source.length - 1; ++k) {
    str += ALPHABET[0]
  }
  // convert digits to a string
  for (let q = digits.length - 1; q >= 0; --q) {
    str += ALPHABET[digits[q]]
  }
  return str
}

function isAddress(address: string): boolean {
  if (typeof address !== 'string') {
    return false
  }
  if (!/^[0-9]{1,20}$/g.test(address)) {
    if (!base58DecodeUnsafe(address.slice(1))) {
      return false
    }
    if (
      ['A'].indexOf(address[0]) === -1 &&
      ['S'].indexOf(address[0]) === -1 &&
      ['G'].indexOf(address[0]) === -1
    ) {
      return false
    }
  }
  return true
}

function generateBase58CheckAddress(publicKey: Bytes): string {
  if (typeof publicKey === 'string') {
    publicKey = Buffer.from(publicKey, 'hex')
  }
  let h1 = sha256Bytes(publicKey)
  let h2 = new RIPEMD160().update(Buffer.from(h1)).digest()
  return NORMAL_PREFIX + base58Encode(h2)
}

function createAccount(): Account {
  const mnemonic = generateMnemonic()
  const publicKey = getKeys(mnemonic).publicKey
  // let password = base64EncodeToString(priKeyBytes)
  return {
    privateKey: mnemonic,
    address: getAddressByPublicKey(publicKey)
  }
}

function generateMnemonic(): string {
  return Bip39.generateMnemonic()
}

function getAddressByPublicKey(publicKey: Bytes): string {
  if (typeof publicKey === 'string') {
    publicKey = Buffer.from(publicKey, 'hex')
  }
  const h1 = sha256Bytes(publicKey)
  const h2 = new RIPEMD160().update(Buffer.from(h1)).digest()
  return NORMAL_PREFIX + base58Encode(h2)
}

function fromSatoshi(rawAmount: number, precision: number = 8): number {
  return rawAmount / Math.pow(10, precision)
}

function toSatoshi(amount: number, precision: number = 8): number {
  return amount * Math.pow(10, precision)
}

function fullTimestamp(time: number) {
  let d = EPOCHTIME
  let t = d.getTime() / 1000

  d = new Date((time + t) * 1000)
  const month = d.getMonth() + 1
  let monthStr = month + ''
  if (month < 10) {
    monthStr = '0' + month
  }

  const day = d.getDate()
  let dayStr = day + ''
  if (day < 10) {
    dayStr = '0' + day
  }

  const h = d.getHours()
  let hStr = h + ''
  const m = d.getMinutes()
  let mStr = m + ''
  const s = d.getSeconds()
  let sStr = s + ''

  if (h < 10) {
    hStr = '0' + h
  }

  if (m < 10) {
    mStr = '0' + m
  }

  if (s < 10) {
    sStr = '0' + s
  }

  return d.getFullYear() + '/' + monthStr + '/' + dayStr + ' ' + hStr + ':' + mStr + ':' + sStr
}

function getTime(time: number | undefined = undefined): number {
  if (time === undefined) {
    time = new Date().getTime()
  }
  const d = EPOCHTIME
  const t = d.getTime()
  return Math.floor((time - t) / 1000)
}

function transactionBuilder(params: ObjectType): Transaction {
  let transaction = {
    type: params.type,
    timestamp: getTime() - 5,
    fee: params.fee,
    args: params.args,
    senderPublicKey: params.address,
    senderId: params.address,
    signatures: [],
    secondSecret: params.secondSecret,
    message: params.message || ''
  }
  return transaction
}

function sha256Hex(data: Uint8Array) {
  return Buffer.from(sha256Bytes(data)).toString('hex')
}

export {
  sign,
  secondSign,
  fullSign,
  signBytes,
  getId,
  verify,
  verifyBytes,
  // hash,
  isAddress,
  createAccount,
  generateMnemonic,
  getAddressByPublicKey,
  fromSatoshi,
  toSatoshi,
  // transactionBuilder,
  getTime,
  getKeys,
  fullTimestamp,
  getHash
}
