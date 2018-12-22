import UnsignedTransaction from "../UnsignedTransaction";

export function transfer(account: string, token: string, amount: number | string, to: string): UnsignedTransaction {
  return {
    type: 1,
    timestamp: 123456,
    id: 'string',
    account: 'string',
    message: 'string',
    fee: 1,
    args: [],
  }
}