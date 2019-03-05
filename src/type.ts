export interface Transaction {
  type: number
  timestamp: number
  id?: string
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
  keypair: any
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

export interface Param {
  name: string
  type: { name: string; text: string }
  index: number
  require: boolean
}

export interface Reponse {
  success: boolean
  error: string
}

export interface Method {
  name: string
  returnType: { name: string; text: string }
  parameters: Array<Param>
  isConstructor: boolean
  isPublic: boolean
  isDefaultPayable: boolean
  isPayable: boolean
  isConstant: boolean
}

// export enum Network {
//   Local,
//   Test,
//   Main
// }
