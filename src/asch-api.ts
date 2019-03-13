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

  public async transferXAS(amount: number, recipientId: string, message: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.transferXAS(amount, recipientId, message)
    trx = await this.aschWeb.sign(trx)
    console.log('+++++transaction:' + JSON.stringify(trx))
    return this.broadcastTransaction(trx)
  }

  // 设置昵称
  public async setName(name: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setName(name)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  // 设置二级密码
  public async setSecondPassword(secondPwd: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setSecondPassword(secondPwd)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 锁仓
  public async setLock(height: number, amount: number): Promise<object> {
    let trx: Transaction = TransactionBuilder.setLock(height, amount)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 解锁
  public async unlock(): Promise<object> {
    let trx: Transaction = TransactionBuilder.unlock()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 设置多签账户
  public async setMultiAccount(): Promise<object> {
    let trx: Transaction = TransactionBuilder.setMultiAccount()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 注册为代理人
  public async registerAgent(): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerAgent()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 设置投票代理人
  public async setAgent(agent: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setAgent(agent)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 取消投票代理
  public async repealAgent(): Promise<object> {
    let trx: Transaction = TransactionBuilder.repealAgent()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 注册为受托人
  public async registerDelegate(): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerDelegate()
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 受托人投票
  public async voteDelegate(delegates: string[]): Promise<object> {
    let trx: Transaction = TransactionBuilder.voteDelegate(delegates)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  // 撤销受托人投票
  public async cleanVote(delegates: string[]): Promise<object> {
    let trx: Transaction = TransactionBuilder.cleanVote(delegates)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  // 注册发行商 TODO
  public async registerIssuer(name: string, desc: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerIssuer(name, desc)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 注册资产 TODO
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
  // 发行资产
  public async issueAsset(symbol: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.issueAsset(symbol, amount)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 资产转账
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
  // 注册 dapp
  public async registerDapp(
    name: string,
    desc: string,
    tags: string,
    link: string,
    icon: string,
    category: string,
    delegates: number,
    nlockNumber: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerDapp(
      name,
      desc,
      tags,
      link,
      icon,
      category,
      delegates,
      nlockNumber
    )
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 更新 dapp 记账人
   * @param dappId
   * @param from
   * @param to
   */
  public async updateBooker(dappId: string, from: string, to: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.updateBooker(dappId, from, to)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 添加 dapp 记账人
  public async addBooker(dappId: string, key: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.addBooker(dappId, key)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 删除 dapp 记账人
  public async deleteBooker(dappId: string, key: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.deleteBooker(dappId, key)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // dapp 充值
  public async depositDapp(name: string, currency: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.depositDapp(name, currency, amount)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // dapp 提现 TODO  参数问题
  public async withdrawDapp(
    dappId: string,
    recipient: string,
    amount: string,
    wid: string,
    signatures: string
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.withdrawDapp(
      dappId,
      recipient,
      amount,
      wid,
      signatures
    )
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 发起提案
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
  // 对提案投票
  public async voteProposal(pid: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.voteProposal(pid)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 激活提案
  public async activateProposal(pid: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.activateProposal(pid)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关注册候选人
  public async registerGateway(gateway: string, publicKey: string, desc: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerGateway(gateway, publicKey, desc)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关开户
  public async openGatewayAccount(gateway: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.openGatewayAccount(gateway)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关充值
  public async depositGateway(address: string, currency: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.depositGateway(address, currency, amount)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关提现
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
   *  注册合约
   * @param name
   * @param version
   * @param desc
   * @param code
   * @param consumeOwnerEnergy
   * @param asLimit
   */
  public async registerContract(
    name: string,
    version: string,
    desc: string,
    code: string,
    consumeOwnerEnergy: boolean,
    asLimit: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.buildTransaction(600, [
      asLimit,
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
   *  调用合约方法
   * @param contractName
   * @param methodName
   * @param methodArgs
   * @param gasLimit
   * @param enablePayGasInXAS
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
   * @param currency
   * @param amount
   * @param receiverPath
   * @param gasLimit
   * @param enablePayGasInXAS
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
