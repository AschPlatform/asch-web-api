import { Transaction } from '../type'
import calFee from '../asch-fee'
import * as Constants from '../constants'
import * as Slots from '../time/slots'
import * as Utils from '../utils'

function convertBigintMemberToString(obj: any) {
  if (typeof obj !== 'object' || obj === null) return
  let bint = 'bigint'
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    const type = typeof value
    if (type === bint) {
      obj[key] = String(value)
    }
    else if (type === 'object') {
      convertBigintMemberToString(value)
    }
  })
}


/**
 * TransactionBuilder 创建未签名交易
 */
export class TransactionBuilder {

  /**
   * 构建一个未签名的交易
   * @param type 交易类型
   * @param args 交易所需要的参数
   * @param message 备注
   * @param options 选项
   */
  static buildTransaction(
    type: number,
    args: Array<any>,
    message: string = '',
    options = {}
  ): Transaction {
    convertBigintMemberToString(args)
    let transaction: Transaction = {
      type: type,
      fee: 0,
      args: args,
      timestamp: 0,
      message: message,
      senderPublicKey: '',
      senderId: ''
      //mode: 0
    }
    transaction = calFee(transaction)
    transaction.timestamp = Slots.getTime() - Constants.CLIENT_DRIFT_SECONDS
    return transaction
  }

  static convertSecondPwd(pwd: string): string {
    const key = pwd
    const keyPair = Utils.getKeys(key)
    return keyPair.publicKey
  }

  /**
   * 主链转账XAS
   * @param amount 转账数量
   * @param recipientId 接收者地址
   * @param message 转账备注 
   */
  static transferXAS(amount: number | string, to: string, message: string): Transaction {
    return this.buildTransaction(1, [amount, to], message)
  }


  /**
   * 设置昵称
   * @param name 昵称
   */
  static setName(name: string): Transaction {
    return this.buildTransaction(2, [name])
  }

  /**
   * 设置二级密码
   * @param secondPwd 二级密码(加密后publickey)
   */
  static setSecondPassword(secondPwd: string): Transaction {
    let pubkey = this.convertSecondPwd(secondPwd)
    return this.buildTransaction(3, [pubkey])
  }

  /**
   * 锁仓
   * @param height 锁仓高度
   * @param amount 锁仓XAS数量
   */
  static setLock(height: number, amount: number): Transaction {
    return this.buildTransaction(4, [height, amount])
  }

  /**
   * 解锁
   */
  static unlock(): Transaction {
    return this.buildTransaction(5, [])
  }

  /**
   * 设置理事会
   * @param name 理事会名称
   * @param members 成员组
   * @param min 最少决策数(最少为3)
   * @param max 最多决策数
   * @param m 决策权值最小值
   * @param updateInterval 更新间隔
   */
  static setMultiAccount(name: string, members: Array<any>, min: number, max: number, m: number, updateInterval: number): Transaction {
    return this.buildTransaction(6, [name, members, min, max, m, updateInterval])
  }

  /**
  * 注册代理人
  */
  static registerAgent(): Transaction {
    return this.buildTransaction(7, [])
  }

  /**
   * 设置投票代理人
   * @param agent 代理人昵称
   */
  static setAgent(agent: string): Transaction {
    return this.buildTransaction(8, [agent])
  }

  /**
   * 取消投票代理
   */
  static repealAgent(): Transaction {
    return this.buildTransaction(9, [])
  }

  /**
   * 注册为受托人
   */
  static registerDelegate(): Transaction {
    return this.buildTransaction(10, [])
  }

  /**
   * 给委托人投票
   * @param delegates 受托人公钥数组,最多33个
   */
  static voteDelegate(delegates: string[]): Transaction {
    return this.buildTransaction(11, delegates)
  }

  /**
   * 撤销受托人投票
   * @param delegates 受托人公钥数组,最多33个
   */
  static cleanVote(delegates: string[]): Transaction {
    return this.buildTransaction(12, delegates)
  }

  /**
   * 带宽和CPU抵押
   * @param bandwidth 带宽抵押的XAS数量
   * @param cpu CPU抵押的XAS数量
   */
  static pledge(bandwidth: string|number, cpu: string|number): Transaction {
    return this.buildTransaction(13, [bandwidth, cpu])
  }

  /**
   * 取消带宽和CPU抵押
   * @param bandwidth 取消带宽抵押的XAS数量
   * @param cpu 取消CPU抵押的XAS数量
   */
  static unPledge(bandwidth: string|number, cpu: string|number): Transaction {
    return this.buildTransaction(14, [bandwidth, cpu])
  }

  /**
   * 注册发行商
   * @param name 发行商名称
   * @param desc 描述
   */
  static registerIssuer(name: string, desc: string): Transaction {
    return this.buildTransaction(100, [name, desc])
  }

  /**
   * 注册资产
   * @param symbol 资产名称
   * @param desc 描述
   * @param maximum 上限
   * @param precision 精度
   */
  static registerAsset(
    symbol: string,
    desc: string,
    maximum: number,
    precision: number
  ): Transaction {
    return this.buildTransaction(101, [symbol, desc, maximum, precision])
  }

  /**
   * 发行资产
   * @param symbol 资产名称
   * @param amount 发行数量
   */
  static issueAsset(symbol: string, amount: string): Transaction {
    return this.buildTransaction(102, [symbol, amount])
  }

  /**
   * 资产转账(内部转账)
   * @param symbol 资产名称
   * @param amount 数量
   * @param recipientId 接收人地址
   * @param message 备注
   */
  static transferAsset(
    symbol: string,
    amount: string,
    recipientId: string,
    message: string
  ): Transaction {
    return this.buildTransaction(103, [symbol, amount, recipientId], message)
  }

  /**
   * 注册侧链DApp
   * @param name dapp名称
   * @param desc 描述
   * @param tags 标签
   * @param link 链接
   * @param icon 图标
   * @param delegates 委托人
   * @param nlockNumber 最小受托人数量
   */
  static registerDapp(
    name: string,
    desc: string,
    tags: string,
    link: string,
    icon: string,
    delegates: number,
    nlockNumber: number
  ): Transaction {
    return this.buildTransaction(200, [name, desc, link, icon, delegates, nlockNumber])
  }

  /**
   * 更新Dapp委托人
   * @param dappId Dapp ID
   * @param from 旧的记账人公钥
   * @param to  新的记账人公钥
   */
  static updateBooker(dappId: string, from: string, to: string): Transaction {
    return this.buildTransaction(201, [dappId, from, to])
  }

  /**
   * 添加Dapp委托人
   * @param dappId Dapp ID
   * @param key 委托人公钥
   */
  static addBooker(dappId: string, key: string): Transaction {
    return this.buildTransaction(202, [dappId, key])
  }

  /**
   * 删除Dapp委托人
   * @param dappId Dapp ID
   * @param key 委托人公钥
   */
  static deleteBooker(dappId: string, key: string): Transaction {
    return this.buildTransaction(203, [dappId, key])
  }

  /**
   * 充值到侧链DApp
   * @param dappId  Dapp ID
   * @param currency 资产名称
   * @param amount 数量
   */
  static depositDapp(dappId: string, currency: string, amount: string): Transaction {
    return this.buildTransaction(204, [name, currency, amount])
  }

  /**
   * 从Dapp提现 
   * @param dappId Dapp ID
   * @param recipient 接受者地址
   * @param currency 资产名
   * @param amount 提现金额
   * @param oid 
   * @param signatures 
   */
  static withdrawDapp(
    dappId: string,
    recipient: string,
    currency: string,
    amount: string,
    oid: string,
    signatures: string
  ): Transaction {
    return this.buildTransaction(205, [dappId, recipient, currency, amount, oid, signatures])
  }

  /**
   * 发起提案
   * @param title 提案标题
   * @param desc 描述
   * @param topic 提案类型
   * @param content 内容
   * @param endHeight 提案结束高度
   */
  static createProposal(
    title: string,
    desc: string,
    topic: string,
    content: string,
    endHeight: number
  ): Transaction {
    return this.buildTransaction(300, [title, desc, topic, content, endHeight])
  }

  /**
   * 给提案投票
   * @param pid 提案的编号
   */
  static voteProposal(pid: string): Transaction {
    return this.buildTransaction(301, [pid])
  }

  /**
   * 激活提案
   * @param pid 提案的编号
   */
  static activateProposal(pid: string): Transaction {
    return this.buildTransaction(302, [pid])
  }

  /**
   * 网关注册成员
   * @param gateway 网关名字
   * @param publicKey 成员公钥
   * @param desc 描述
   */
  static registerGateway(gateway: string, publicKey: string, desc: string): Transaction {
    return this.buildTransaction(401, [gateway, publicKey, desc])
  }

  /**
   * 开通网关账户
   * @param gateway 网关的名字
   */
  static openGatewayAccount(gateway: string): Transaction {
    return this.buildTransaction(400, [gateway])
  }

  /**
   * 对网关充值
   * @param gateway 网关名字
   * @param address 存款地址
   * @param currency 资产名称
   * @param amount 数量
   * @param oid 
   */
  static depositGateway(gateway: string, address: string, currency: string, amount: string, oid: string): Transaction {
    return this.buildTransaction(402, [gateway, address, currency, amount, oid])
  }

  /**
   * 从网关提现
   * @param address 提现地址
   * @param gateway 网关名字
   * @param currency 资产名称
   * @param amount 数量
   * @param fee 手续费
   */
  static withdrawGateway(
    address: string,
    gateway: string,
    currency: string,
    amount: number,
    fee: number
  ): Transaction {
    return this.buildTransaction(403, [address, gateway, currency, amount, fee])
  }

  /**
   * 注册合约
   * @param name 智能合约名称，全网唯一，3 ~ 32个字母或数字组成
   * @param version 合约引擎版本，目前请填v1.0
   * @param desc 智能合约的描述，长度不超过255的字符串
   * @param code 智能合约代码，长度不超过16K
   * @param consumeOwnerEnergy 是否优先消耗合约所有者的能量
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   */
  static registerContract(
    name: string,
    version: string,
    desc: string,
    code: string,
    consumeOwnerEnergy: boolean=true,
    gasLimit: number=1000000
  ): Transaction {
    return this.buildTransaction(600, [gasLimit, name, version, desc, code, consumeOwnerEnergy])
  }

  /**
   * 调用合约方法
   * @param contractName 智能合约名称
   * @param methodName 要调用的方法名称
   * @param methodArgs 调用方法所需要的参数列表
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   * @param enablePayGasInXAS 当调用者能量不足时，是否使用XAS支付Gas
   */
  static callContract(
    contractName: string,
    methodName: string,
    methodArgs: Array<any>,
    gasLimit: number=100000,
    enablePayGasInXAS: boolean=true
  ): Transaction {
    return this.buildTransaction(601, [
      gasLimit,
      enablePayGasInXAS,
      contractName,
      methodName,
      methodArgs
    ])
  }

  /**
   * 转账到合约
   * @param currency 转账资产名称
   * @param amount 转账金额
   * @param nameOrAddress 合约名称或者地址
   * @param methodName payable方法名称, 若为undefined, null或者''，则调用默认的payable方法
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   * @param enablePayGasInXAS 当调用者能量不足时，是否使用XAS支付Gas
   */
  static payContract(
    currency: string,
    amount: number|string,
    nameOrAddress: string,
    methodName?: string,
    gasLimit: number = 100000,
    enablePayGasInXAS: boolean = true
  ): Transaction {
    return this.buildTransaction(602, [
      gasLimit,
      enablePayGasInXAS,
      nameOrAddress,
      (methodName && methodName.length > 0) ? methodName : '',
      amount,
      currency
    ])
  }
}
