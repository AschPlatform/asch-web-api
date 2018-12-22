import UnsignedTransaction from './UnsignedTransaction'
import SignedTransaction from './SignedTransaction'
import * as transactionBuilder from './builders'

type Bytes = string | Uint8Array
type Transaction = Bytes | UnsignedTransaction

function sign(transaction: Transaction, secret: string): SignedTransaction {
  const trs = {
    type: 1,
    timestamp: 123456,
    id: 'string',
    account: 'string',
    message: 'string',
    fee: 1,
    mode: 1,
    args: [],

    signer: 'string',
    signerKey: 'string',
    signature: '',
    secondSignature: ''
  }
  return trs
}

function signBytes(bytes: Bytes) : string {
  return ''
}

function verify(transaction: Transaction) : boolean {
  return true
}

function verifyBytes(bytes: Bytes) : boolean {
  return true
}

function hash(bytes: Bytes): string {
  return ''
}

function isAddress(address: string): boolean {
  return true
}

function createAccount() {
  return {}
}

function generateMnemonic(size: number = 12): string {
  return ''
}

function getAddressByPublicKey(): string {
  return ''
}

function fromSatoshi(satoshi: number): number {
  return 1
}

function toSatoshi(xas: number): number {
  return 100000000
}

export default {
  sign,
  signBytes,
  verify,
  verifyBytes,
  hash,
  isAddress,
  createAccount,
  generateMnemonic,
  getAddressByPublicKey,
  fromSatoshi,
  toSatoshi,

  transactionBuilder,
}