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

  public transferXAS(amount: number, recipientId: string, message: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.transferXAS(amount, recipientId, message)
    trx = this.aschWeb.fullSign(trx)
    console.log('+++++transaction:' + JSON.stringify(trx))
    return this.broadcastTransaction(trx)
  }

  // 设置昵称
  public setName(name: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setName(name)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }

  // 设置二级密码
  public setSecondPassword(secondPwd: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setSecondPassword(secondPwd)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 锁仓
  public setLock(height: number, amount: number): Promise<object> {
    let trx: Transaction = TransactionBuilder.setLock(height, amount)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 解锁
  public unlock(): Promise<object> {
    let trx: Transaction = TransactionBuilder.unlock()
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 设置多签账户
  public setMultiAccount(): Promise<object> {
    let trx: Transaction = TransactionBuilder.setMultiAccount()
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 注册为代理人
  public registerAgent(): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerAgent()
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 设置投票代理人
  public setAgent(agent: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.setAgent(agent)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 取消投票代理
  public repealAgent(): Promise<object> {
    let trx: Transaction = TransactionBuilder.repealAgent()
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 注册为受托人
  public registerDelegate(): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerDelegate()
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 受托人投票
  public voteDelegate(delegates: string[]): Promise<object> {
    let trx: Transaction = TransactionBuilder.voteDelegate(delegates)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }

  // 撤销受托人投票
  public cleanVote(delegates: string[]): Promise<object> {
    let trx: Transaction = TransactionBuilder.cleanVote(delegates)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }

  // 注册发行商 TODO
  public registerIssuer(name: string, desc: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerIssuer(name, desc)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 注册资产 TODO
  public registerAsset(
    symbol: string,
    desc: string,
    maximum: number,
    precision: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerAsset(symbol, desc, maximum, precision)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 发行资产
  public issueAsset(symbol: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.issueAsset(symbol, amount)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 资产转账
  public transferAsset(
    symbol: string,
    amount: string,
    recipientId: string,
    message: string
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.transferAsset(symbol, amount, recipientId, message)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 注册 dapp
  public registerDapp(
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
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 更新 dapp 记账人
   * @param dappId
   * @param from
   * @param to
   */
  public updateBooker(dappId: string, from: string, to: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.updateBooker(dappId, from, to)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 添加 dapp 记账人
  public addBooker(dappId: string, key: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.addBooker(dappId, key)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 删除 dapp 记账人
  public deleteBooker(dappId: string, key: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.deleteBooker(dappId, key)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // dapp 充值
  public depositDapp(name: string, currency: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.depositDapp(name, currency, amount)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // dapp 提现 TODO  参数问题
  public withdrawDapp(
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
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 发起提案
  public createProposal(
    title: string,
    desc: string,
    topic: string,
    content: string,
    endHeight: number
  ): Promise<object> {
    let trx: Transaction = TransactionBuilder.createProposal(title, desc, topic, content, endHeight)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 对提案投票
  public voteProposal(pid: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.voteProposal(pid)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 激活提案
  public activateProposal(pid: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.activateProposal(pid)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关注册候选人
  public registerGateway(gateway: string, publicKey: string, desc: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.registerGateway(gateway, publicKey, desc)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关开户
  public openGatewayAccount(gateway: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.openGatewayAccount(gateway)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关充值
  public depositGateway(address: string, currency: string, amount: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.depositGateway(address, currency, amount)
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
  // 网关提现
  public withdrawGateway(
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
    trx = this.aschWeb.fullSign(trx)
    return this.broadcastTransaction(trx)
  }
}
