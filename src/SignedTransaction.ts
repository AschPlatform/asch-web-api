import UnsignedTransaction from "./UnsignedTransaction"

export default interface SignedTransaction extends UnsignedTransaction {
  signer: string
  signerKey: string
  signature: string
  secondSignature: string
}