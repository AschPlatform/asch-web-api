// export * from './transfer'
// export * from './vote'
// export * from './issue'
import { ObjectType, Transaction } from '../type'
import { getTime } from '../utils'
// import { type } from 'os'
import calFee from '../asch-fee'
import * as Constants from '../constants'
import * as Slots from '../slots'
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
    transaction.timestamp = Slots.getTime() - Constants.CLIENT_DRIFT_SECONDS
    return transaction
  }

  // export function transfer(from: string, token: string, amount: number | string, to: string, message: string): Transaction {
  //   if( token === 'XAS'){
  //     return buildTransaction(1, [amount, to],message)
  //   }else{
  //     return buildTransaction(103, [token, amount, to])
  //   }
  // }

  static convertSecondPwd(pwd: string): string {
    // const key = pwd
    // const keyPair = AschJS.crypto.getKeys(key)
    // return keyPair.publicKey
    return ''
  }

  //转账XAS
  static transferXAS(amount: number | string, to: string, message: string): Transaction {
    return this.buildTransaction(1, [amount, to], message)
  }

  // //转账自定义资产
  // static transferUIA(
  //   token: string,
  //   amount: number | string,
  //   to: string,
  //   message: string
  // ): Transaction {
  //   return this.buildTransaction(103, [token, amount, to])
  // }

  // 设置昵称
  static setName(name: string): Transaction {
    return this.buildTransaction(2, [name])
  }

  // 设置二级密码
  static setSecondPassword(secondPwd: string): Transaction {
    let pubkey = this.convertSecondPwd(secondPwd)
    return this.buildTransaction(3, [pubkey])
  }
  // 锁仓
  static setLock(height: number, amount: number): Transaction {
    return this.buildTransaction(4, [height, amount])
  }
  // 解锁
  static unlock(): Transaction {
    return this.buildTransaction(5, [])
  }
  // 设置多签账户
  static setMultiAccount(): Transaction {
    return this.buildTransaction(6, [])
  }
  // 注册为代理人
  static registerAgent(): Transaction {
    return this.buildTransaction(7, [])
  }
  // 设置投票代理人
  static setAgent(agent: string): Transaction {
    return this.buildTransaction(8, [agent])
  }
  // 取消投票代理
  static repealAgent(): Transaction {
    return this.buildTransaction(9, [])
  }
  // 注册为受托人
  static registerDelegate(): Transaction {
    return this.buildTransaction(10, [])
  }
  // 受托人投票
  static voteDelegate(delegates: string[]): Transaction {
    return this.buildTransaction(11, delegates)
  }

  // 撤销受托人投票
  static cleanVote(delegates: string[]): Transaction {
    return this.buildTransaction(12, delegates)
  }

  // 注册发行商 TODO
  static registerIssuer(name: string, desc: string): Transaction {
    return this.buildTransaction(100, [name, desc])
  }
  // 注册资产 TODO
  static registerAsset(
    symbol: string,
    desc: string,
    maximum: number,
    precision: number
  ): Transaction {
    return this.buildTransaction(101, [symbol, desc, maximum, precision])
  }
  // 发行资产
  static issueAsset(symbol: string, amount: string): Transaction {
    return this.buildTransaction(102, [symbol, amount])
  }
  // 资产转账
  static transferAsset(
    symbol: string,
    amount: string,
    recipientId: string,
    message: string
  ): Transaction {
    return this.buildTransaction(103, [symbol, amount, recipientId], message)
  }
  // 注册 dapp
  static registerDapp(
    name: string,
    desc: string,
    tags: string,
    link: string,
    icon: string,
    category: string,
    delegates: number,
    nlockNumber: number
  ): Transaction {
    return this.buildTransaction(200, [name, desc, link, icon, delegates, nlockNumber])
  }

  /**
   * 更新 dapp 记账人
   * @param dappId
   * @param from
   * @param to
   */
  static updateBooker(dappId: string, from: string, to: string): Transaction {
    return this.buildTransaction(201, [dappId, from, to])
  }
  // 添加 dapp 记账人
  static addBooker(dappId: string, key: string): Transaction {
    return this.buildTransaction(202, [dappId, key])
  }
  // 删除 dapp 记账人
  static deleteBooker(dappId: string, key: string): Transaction {
    return this.buildTransaction(203, [dappId, key])
  }
  // dapp 充值
  static depositDapp(name: string, currency: string, amount: string): Transaction {
    return this.buildTransaction(204, [name, currency, amount])
  }
  // dapp 提现 TODO  参数问题
  static withdrawDapp(
    dappId: string,
    recipient: string,
    amount: string,
    wid: string,
    signatures: string
  ): Transaction {
    return this.buildTransaction(205, [dappId, recipient, amount, wid, signatures])
  }
  // 发起提案
  static createProposal(
    title: string,
    desc: string,
    topic: string,
    content: string,
    endHeight: number
  ): Transaction {
    return this.buildTransaction(300, [title, desc, topic, content, endHeight])
  }
  // 对提案投票
  static voteProposal(pid: string): Transaction {
    return this.buildTransaction(301, [pid])
  }
  // 激活提案
  static activateProposal(pid: string): Transaction {
    return this.buildTransaction(302, [pid])
  }
  // 网关注册候选人
  static registerGateway(gateway: string, publicKey: string, desc: string): Transaction {
    return this.buildTransaction(401, [gateway, publicKey, desc])
  }
  // 网关开户
  static openGatewayAccount(gateway: string): Transaction {
    return this.buildTransaction(400, [gateway])
  }
  // 网关充值
  static depositGateway(address: string, currency: string, amount: string): Transaction {
    return this.buildTransaction(402, [address, currency, amount])
  }
  // 网关提现
  static withdrawGateway(
    address: string,
    gateway: string,
    currency: string,
    amount: number,
    fee: number
  ): Transaction {
    return this.buildTransaction(403, [address, gateway, currency, amount, fee])
  }
}
