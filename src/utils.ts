import * as Bip39 from 'bip39'
import * as sha256 from 'fast-sha256'
import * as RIPEMD160 from 'ripemd160'
import * as nacl from 'tweetnacl'
import * as ByteBuffer from 'bytebuffer'
import * as Format from './time/format'
// import { Buffer } from '../node_modules/buffer/'
// import * as libBuffer from 'buffer'

// console.log('libBuffer:' + JSON.stringify(libBuffer))
// console.log('globalBuffer:' + global.Buffer)

// const Buffer = global.Buffer || libBuffer

// export default Buffer

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

function sha256Bytes(data: Uint8Array): Uint8Array {
  return sha256.hash(data)
}

function getHash(
  transaction: Transaction,
  skipSignature: boolean = false,
  skipSecondSignature: boolean = false
) {
  return sha256Bytes(getBytes(transaction, skipSignature, skipSecondSignature))
}

function getBytes(
  trs: Transaction,
  skipSignature: boolean = false,
  skipSecondSignature: boolean = false
): Uint8Array {
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
}

/**
 * 填充 senderId和senderPublicKey
 * @param transaction
 * @param secret
 */
function fill(transaction: Transaction, secret: string): Transaction {
  let keys = getKeys(secret)
  transaction.senderPublicKey = keys.publicKey
  transaction.senderId = getAddress(keys.publicKey)
  return transaction
}

function sign(transaction: Transaction, secret: string): Transaction {
  let hash = getHash(transaction, true, true)
  let keys = getKeys(secret)
  let signature = nacl.sign.detached(hash, keys.keypair.secretKey)
  let signStr = new Buffer(signature).toString('hex')
  if (transaction.signatures == null) transaction.signatures = new Array<string>()
  transaction.signatures!.push(signStr)
  transaction.id = new Buffer(getId(transaction)).toString('hex')
  return transaction
}

function secondSign(transaction: Transaction, secret: string): Transaction {
  let hash = getHash(transaction, true, true)
  let keys = getKeys(secret)
  let signature = nacl.sign.detached(hash, keys.keypair.secretKey)
  let signStr = new Buffer(signature).toString('hex')
  transaction.secondSignature = signStr
  transaction.id = new Buffer(getId(transaction)).toString('hex')
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
  let trx = fill(unsignedTrx, secret)
  trx = sign(unsignedTrx, secret)
  if (secondSecret != null && secondSecret.length > 0) {
    trx = secondSign(trx, secondSecret)
  }
  // trx.id = new Buffer(getId(trx)).toString('hex')
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

/**
 * 将Hex字符串或者buffer转换成Uint8Array
 * @param hex 
 */
function fromHex(hex: string | Buffer): Uint8Array {
  if (typeof hex === 'string') {
    hex = Buffer.from(hex, 'hex')
    // return Uint8Array.from(Buffer.from(hex, 'hex'))
  }
  let a = new Uint8Array(hex.length)
  for (let i = 0; i < hex.length; i++) {
    a[i] = hex[i]
  }
  return a;
}

/**
 * 将Uint8Array转换成十六进制的字符串
 * @param bytes 
 */
function toHex(bytes: Uint8Array): string {
  if (typeof bytes === 'string') {
    return bytes;
  }
  return new Buffer(bytes).toString('hex')
}

/**
 * 对字节数字签名
 * @param bytes 
 * @param secretKey 12个单词的mnemonic或者hex字符串，或者Uint8Array
 */
function signBytes(bytes: Bytes, secretKey: Bytes): string {
  if (typeof bytes === 'string') {
    bytes = fromHex(bytes)
  }
  if (typeof secretKey === 'string') {
    if(secretKey.split(' ').length==12){
     let keys: Keys =  getKeys(secretKey)
     secretKey = keys.keypair.secretKey
    }else{
     secretKey = fromHex(secretKey)
    }
  }
  console.log('secretKey:' + secretKey)
  let hash = sha256Bytes(bytes)
  console.log('hash:' + hash)
  let signature = nacl.sign.detached(hash, secretKey)
  return toHex(signature)
}

/**
 * 
 * @param transaction 
 */
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

/**
 * 验证签名
 * @param bytes 
 * @param signature 
 * @param publicKey 
 */
function verifyBytes(bytes: Bytes, signature: Bytes, publicKey: Bytes): boolean {
  if (typeof bytes === 'string') {
    bytes = fromHex(bytes)
  }
  if (typeof signature === 'string') {
    signature = fromHex(signature)
  }
  if (typeof publicKey === 'string') {
    publicKey = fromHex(publicKey)
  }
  let hash = sha256Bytes(bytes)
  let res = nacl.sign.detached.verify(hash, signature, publicKey)
  return res
}

function getId(transaction: Transaction): Uint8Array {
  return sha256Bytes(getBytes(transaction))
}

function base58DecodeUnsafe(str: string) {
  if (str.length === 0) return Buffer.allocUnsafe(0)

  let bytes: number[] = [0]
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

function base58Encode(payload: Uint8Array): string {

  let checksum: Buffer = new Buffer(sha256Bytes(sha256Bytes(payload)))
  let source: Buffer = Buffer.concat([new Buffer(payload), checksum], payload.length + 4)
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

  let str: string = ''

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

function generateBase58CheckAddress(publicKey: string): string {
  let pubKey: Uint8Array
  if (typeof publicKey === 'string') {
    // pubKey = Buffer.from(publicKey, 'hex')
    pubKey = fromHex(publicKey)
  } else {
    pubKey = publicKey
  }
  let h1 = sha256Bytes(pubKey)
  let h2 = new RIPEMD160().update(new Buffer(h1)).digest()
  return NORMAL_PREFIX + base58Encode(h2)
}

function createAccount(): Account {
  const mnemonic = generateMnemonic()
  const publicKey = getKeys(mnemonic).publicKey
  // let password = base64EncodeToString(priKeyBytes)
  return {
    privateKey: mnemonic,
    address: getAddress(publicKey)
  }
}

function generateMnemonic(): string {
  return Bip39.generateMnemonic()
}

function getAddress(publicKey: string): string {
  let pubKey: Uint8Array
  if (typeof publicKey === 'string') {
    pubKey = fromHex(publicKey)
  } else {
    pubKey = publicKey
  }
  const h1: Uint8Array = sha256Bytes(pubKey)
  const h2: Uint8Array = new RIPEMD160().update(new Buffer(h1)).digest()
  return NORMAL_PREFIX + base58Encode(h2)
}

function fromSatoshi(rawAmount: number, precision: number = 8): number {
  return rawAmount / Math.pow(10, precision)
}

function toSatoshi(amount: number, precision: number = 8): number {
  return amount * Math.pow(10, precision)
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

function sha256Hex(data: Uint8Array): string {
  // return Buffer.from(sha256Bytes(data)).toString('hex')
  // return new Buffer(sha256Bytes(data)).toString('hex')
  return toHex(sha256Bytes(data))
}

function injectPromise(func: any, ...args: any[]) {
  return new Promise((resolve, reject) => {
    func(...args, (err: any, res: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

// injectPromise(func, ...args) {
//   return new Promise((resolve, reject) => {
//       func(...args, (err, res) => {
//           if(err)
//               reject(err);
//           else resolve(res);
//       });
//   });
// },

function promiseInjector(scope: any) {
  return (func: any, ...args: any[]) => {
    return injectPromise(func.bind(scope), ...args)
  }
}

function isFunction(obj: any) {
  return typeof obj === 'function';
}

export {
  fill,
  sign,
  secondSign,
  fullSign,
  signBytes,
  getId,
  fromHex,
  toHex,
  verify,
  verifyBytes,
  sha256Bytes,
  isAddress,
  createAccount,
  generateMnemonic,
  getAddress,
  fromSatoshi,
  toSatoshi,
  // transactionBuilder,
  getTime,
  getKeys,
  Format,
  getHash,
  injectPromise,
  promiseInjector,
  isFunction,
  ByteBuffer
}
