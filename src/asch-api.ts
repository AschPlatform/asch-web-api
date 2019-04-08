import { API } from './api'
import AschWeb from './asch-web'
import { TransactionBuilder } from './builders'
import { Transaction } from './type'
import { Network } from './providers'
export default class AschAPI extends API {
  aschWeb: AschWeb
  constructor(aschWeb: AschWeb) {
    super(aschWeb.provider)
    this.aschWeb = aschWeb
  }

  /**
   * 主链转账XAS
   * @param amount 转账数量
   * @param recipientId 接收者地址
   * @param message 转账备注 
   */
  public async transferXAS(amount: number, recipientId: string, message: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.transferXAS(amount, recipientId, message)
    trx = await this.aschWeb.sign(trx)
    //console.log('+++++transaction:' + JSON.stringify(trx))
    return this.broadcastTransaction(trx)
  }

  /**
   * 设置昵称
   * @param name 昵称
   */
  public async setName(name: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setName(name)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 设置二级密码
   * @param secondPwd 二级密码(加密后publickey)
   */
  public async setSecondPassword(secondPwd: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setSecondPassword(secondPwd)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 锁仓
   * @param height 锁仓高度
   * @param amount 锁仓XAS数量
   */
  public async setLock(height: number, amount: number): Promise<object> {
    let trx: Transaction = TransactionBuilder.setLock(height, amount)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 解锁
   */
  public async unlock(): Promise<object> {
    let trx: Transaction = TransactionBuilder.unlock()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 设置理事会
   */
  /**
   * 设置理事会
   * @param name 理事会名称
   * @param members 成员组
   * @param min 最少决策数(最少为3)
   * @param max 最多决策数
   * @param m 决策权值最小值
   * @param updateInterval 更新间隔
   */
  public async setMultiAccount(name: string,members: Array<any>, min: number ,max: number ,m: number ,updateInterval :number): Promise<object> {
    let trx: Transaction = TransactionBuilder.setMultiAccount(name,members,min,max,m,updateInterval)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 注册代理人
   */
  public async registerAgent(): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerAgent()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 设置投票代理人
   * @param agent 代理人昵称
   */
  public async setAgent(agent: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setAgent(agent)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 取消投票代理
   */
  public async repealAgent(): Promise<object> {
    let trx: Transaction = TransactionBuilder.repealAgent()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 注册为受托人
   */
  public async registerDelegate(): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerDelegate()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 给委托人投票
   * @param delegates 受托人公钥数组,最多33个
   */
  public async voteDelegate(delegates: string[]): Promise<object> {
    let trx: Transaction = TransactionBuilder.voteDelegate(delegates)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 撤销受托人投票
   * @param delegates 受托人公钥数组,最多33个
   */
  public async cleanVote(delegates: string[]): Promise<object> {
    let trx: Transaction = TransactionBuilder.cleanVote(delegates)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 注册发行商
   * @param name 发行商名称
   * @param desc 描述
   */
  public async registerIssuer(name: string, desc: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerIssuer(name, desc)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 注册资产
   * @param symbol 资产名称
   * @param desc 描述
   * @param maximum 上限
   * @param precision 精度
   */
  public async registerAsset(
    symbol: string,
    desc: string,
    maximum: number,
    precision: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerAsset(symbol, desc, maximum, precision)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 发行资产
   * @param symbol 资产名称
   * @param amount 发行数量
   */
  public async issueAsset(symbol: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.issueAsset(symbol, amount)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 资产转账(内部转账)
   * @param symbol 资产名称
   * @param amount 数量
   * @param recipientId 接收人地址
   * @param message 备注
   */
  public async transferAsset(
    symbol: string,
    amount: string,
    recipientId: string,
    message: string
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.transferAsset(symbol, amount, recipientId, message)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
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
  public async registerDapp(
    name: string,
    desc: string,
    tags: string,
    link: string,
    icon: string,
    delegates: number,
    nlockNumber: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerDapp(
      name,
      desc,
      tags,
      link,
      icon,
      delegates,
      nlockNumber
    )
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 更新Dapp委托人
   * @param dappId Dapp ID
   * @param from 旧的记账人公钥
   * @param to  新的记账人公钥
   */
  public async updateBooker(dappId: string, from: string, to: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.updateBooker(dappId, from, to)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 添加Dapp记账人
   * @param dappId Dapp ID
   * @param key 记账人公钥
   */
  public async addBooker(dappId: string, key: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.addBooker(dappId, key)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 删除Dapp记账人
   * @param dappId Dapp ID
   * @param key 记账人公钥
   */
  public async deleteBooker(dappId: string, key: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.deleteBooker(dappId, key)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 充值到侧链DApp
   * @param dappId  Dapp ID
   * @param currency 资产名称
   * @param amount 数量
   */
  public async depositDapp(dappId: string, currency: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.depositDapp(dappId, currency, amount)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
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
  public async withdrawDapp(
    dappId: string,
    recipient: string,
    currency: string,
    amount: string,
    oid: string,
    signatures: string
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.withdrawDapp(
      dappId,
      recipient,
      currency,
      amount,
      oid,
      signatures
    )
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 发起提案
   * @param title 提案标题
   * @param desc 描述
   * @param topic 提案类型
   * @param content 内容
   * @param endHeight 提案结束高度
   */
  public async createProposal(
    title: string,
    desc: string,
    topic: string,
    content: string,
    endHeight: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.createProposal(title, desc, topic, content, endHeight)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 给提案投票
   * @param pid 提案的编号
   */
  public async voteProposal(pid: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.voteProposal(pid)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 激活提案
   * @param pid 提案的编号
   */
  public async activateProposal(pid: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.activateProposal(pid)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 网关注册成员
   * @param gateway 网关名字
   * @param publicKey 成员公钥
   * @param desc 描述
   */
  public async registerGateway(gateway: string, publicKey: string, desc: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerGateway(gateway, publicKey, desc)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  
  /**
   * 开通网关账户
   * @param gateway 网关的名字
   */
  public async openGatewayAccount(gateway: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.openGatewayAccount(gateway)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 对网关充值
   * @param gateway 网关名字
   * @param address 存款地址
   * @param currency 资产名称
   * @param amount 数量
   * @param oid 
   */
  public async depositGateway(gateway:string, address: string, currency: string, amount: string, oid: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.depositGateway(gateway,address, currency, amount, oid)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 从网关提现
   * @param address 提现地址
   * @param gateway 网关名字
   * @param currency 资产名称
   * @param amount 数量
   * @param fee 手续费
   */
  public async withdrawGateway(
    address: string,
    gateway: string,
    currency: string,
    amount: number,
    fee: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.withdrawGateway(
      address,
      gateway,
      currency,
      amount,
      fee
    )
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
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
  public async registerContract(
    name: string,
    version: string,
    desc: string,
    code: string,
    consumeOwnerEnergy: boolean,
    gasLimit: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.buildTransaction(600, [
      gasLimit,
      name,
      version,
      desc,
      code,
      consumeOwnerEnergy
    ])
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 调用合约方法
   * @param contractName 智能合约名称
   * @param methodName 要调用的方法名称
   * @param methodArgs 调用方法所需要的参数列表
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   * @param enablePayGasInXAS 当调用者能量不足时，是否使用XAS支付Gas
   */
  public async callContract(
    contractName: string,
    methodName: string,
    methodArgs: Array<any>,
    gasLimit: number,
    enablePayGasInXAS: boolean
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.buildTransaction(601, [
      gasLimit,
      enablePayGasInXAS,
      contractName,
      methodName,
      methodArgs
    ])
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 转账到合约
   * @param currency 转账资产名称
   * @param amount 转账金额
   * @param receiverPath 接收转账的路径（由合约地址或名称、'/'、接收方法名称组成，如接收方法是默认接收方法则'/'和接收方法可以省略）
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   * @param enablePayGasInXAS 当调用者能量不足时，是否使用XAS支付Gas
   */
  public async payContract(
    currency: string,
    amount: string,
    receiverPath: string,
    gasLimit: number,
    enablePayGasInXAS: boolean
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.buildTransaction(602, [
      gasLimit,
      enablePayGasInXAS,
      receiverPath,
      amount,
      currency
    ])
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
}
