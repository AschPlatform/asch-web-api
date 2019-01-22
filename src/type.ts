export interface Transaction {
  type: number
  timestamp: number
  id: string
  account: string
  message: string
  fee: number
  args: Array<any>
  senderId: string
  senderPublicKey: string
  signatures?: Array<string>
  secondSignature?: string
  signSignature?: string
}

export interface Keypair {
  privateKey: string
  publicKey: string
}

export interface Keys {
  keypair: nacl.SignKeyPair
  privateKey: string
  publicKey: string
}

export interface Account {
  privateKey: string
  address: string
}

export interface ObjectType {
  [key: string]: any
}
