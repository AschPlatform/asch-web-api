import { SignKeyPair } from 'tweetnacl'
export interface Transaction {
  type: number
  timestamp: number
  id?: string
  message?: string
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
  keypair: SignKeyPair
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
  returnType?: { name: string; text: string }
  parameters: Array<Param>
  isConstructor: boolean
  isPublic: boolean
  isDefaultPayable: boolean
  isPayable: boolean
  isConstant: boolean
}

//Contract meta data
export interface ParameterMetadata {
  index: number
  name: string
  type: TypeInfo
  require: boolean
 }
 
 export interface TypeInfo {
  text: string
  name: string
  kind: TypeKind
  typeArguments?: TypeInfo[]
 }
 
 export enum TypeKind {
  primitive = 0,
  collection = 1,
  custome = 2
 }
 
 export interface MethodMetadata {
  name: string
  parameters: ParameterMetadata[]
  returnType?: TypeInfo
  isConstructor: boolean
  isPublic: boolean
  isPayable: boolean
  isDefaultPayable: boolean
  isConstant: boolean
 }
 
 export interface StateMetadata {
  name: string
  isPublic: boolean
  isReadonly: boolean
  type: TypeInfo
 }
 
 export interface CustomeStateType {
  name: string
  flat: boolean
  properties: StateMetadata[]
 }
 
 export interface ContractMetadataObject {
  className: string
  customeTypes: CustomeStateType[]
  states: StateMetadata[]
  methods: MethodMetadata[]
 }