// export * from './transfer'
// export * from './vote'
// export * from './issue'
import { ObjectType, Transaction } from '../type'
import { getTime } from '../utils'

export function transactionBuilder(params: ObjectType): Transaction {
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
