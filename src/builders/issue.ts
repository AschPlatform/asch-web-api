import { Transaction } from '../type'

export function issue(account: string, token: string, amount: number | string): Transaction {
  return {
    type: 1,
    timestamp: 123456,
    id: 'string',
    message: 'string',
    fee: 1,
    args: [],
    senderId: '',
    senderPublicKey: ''
  }
}
