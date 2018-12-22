export default interface UnsignedTransaction {
  type: number
  timestamp: number
  id: string
  account: string
  message: string
  fee: number
  args: Array<any>
}