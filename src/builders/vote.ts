import UnsignedTransaction from "../UnsignedTransaction";

export function vote(account: string, delegates: Array<string>): UnsignedTransaction {
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