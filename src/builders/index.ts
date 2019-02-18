// export * from './transfer'
// export * from './vote'
// export * from './issue'
import { ObjectType, Transaction } from '../type'
import { getTime } from '../utils'
import { type } from 'os'
import calFee from '../asch-fee'

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

export class TransactionBuilder {
  static buildTransaction(
    type: number,
    args: Array<any>,
    message: string = '',
    options = {}
  ): Transaction {
    let transaction: Transaction = {
      type: type,
      fee: 0,
      args: args,
      timestamp: 0,
      message: '',
      senderPublicKey: '',
      senderId: ''
      //mode: 0
    }
    transaction = calFee(transaction)
    return transaction
  }

  // export function transfer(from: string, token: string, amount: number | string, to: string, message: string): Transaction {
  //   if( token === 'XAS'){
  //     return buildTransaction(1, [amount, to],message)
  //   }else{
  //     return buildTransaction(103, [token, amount, to])
  //   }
  // }

  static transferXAS(amount: number | string, to: string, message: string): Transaction {
    return this.buildTransaction(1, [amount, to], message)
  }

  static transferUIA(
    token: string,
    amount: number | string,
    to: string,
    message: string
  ): Transaction {
    return this.buildTransaction(103, [token, amount, to])
  }

  static setName(name: string): Transaction {
    return this.buildTransaction(2, [name])
  }
}
