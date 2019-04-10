import { API } from './api'
import AschWeb from './asch-web'
import { TransactionBuilder } from './builders'
import { Transaction } from './type'
import { ObjectType } from './type'
import { URLS } from './constants'

export default class AschAPI extends API {
  aschWeb: AschWeb
  constructor(aschWeb: AschWeb) {
    super(aschWeb.provider)
    this.aschWeb = aschWeb
  }

  /**
   * 
   * 以下接口为查询接口
   * 
   */

  /**
   * 本地不加密直接登陆
   * 备注：将密码以明文方式传入到后端，根据生成的地址去查询账户信息。不推荐在公网坏境使用！
   * @param secret 
   */
  public async open(secret: string): Promise<object>{
    return this.post(URLS.accounts.open, {secret:secret})
  }

  /**
   * 本地加密后再登陆（推荐使用）
   * @param publicKey 
   */
  public async open2(publicKey: string): Promise<object>{
    return this.post(URLS.accounts.open2,{publicKey:publicKey})
  }

  /**
   * 根据地址获取账户信息
   * @param address 
   */
  public async getAccountDetail(address: string): Promise<object>{
    return this.get(URLS.v2.accounts.detail.replace(':address', address))
  }

  /**
   * 获取账户资产余额
   * @param address 账户地址
   */
  public async queryBalances(address: string): Promise<object>{
    return this.get(URLS.v2.accounts.balances.replace(':address',address))
  }

  /**
   * 根据地址获取其投票列表
   * @param address 账户地址
   */
  public async queryVotedDelegates(address: string): Promise<object>{
    return this.get(URLS.accounts.deletates_voted, {address: address})
  }

  /**
   * 生成新账户
   */
  public async generateAccount(): Promise<object>{
    return this.get(URLS.accounts.new)
  }

  /**
   * 获取当前链上账户总个数
   */
  public async getAccountCount(): Promise<object>{
    return this.get(URLS.accounts.count)
  }

  /**
   * 获取交易列表
   * @param offset 偏移量
   * @param limit 个数限制
   * @param orderBy 排序方式
   * @param height 交易所所在高度
   * @param senderId 交易签名者地址
   * @param message 交易备注
   */
  public async queryTransactions(offset:number=0, limit:number=20, orderBy: string='', height: number=-1, senderId:string='', message:string=''): Promise<object>{
    let params:ObjectType ={
      offset:offset,
      limit:limit,
      //orderBy:orderBy,
      // height:height,
      // senderId:senderId,
      // message: message
    }
    if (orderBy.length>0) {
      params[orderBy]=orderBy
    }
    if (height!=-1) {
      params[height]=height
    }
    if (senderId.length>0) {
      params[senderId]=senderId
    }
    if (message.length>0) {
      params[message]=message
    }
    return this.get(URLS.v2.transactions.list,params)
  }

  /**
   *  根据交易id查看交易详情
   * @param tid 
   */
  public async getTransactionDetail(tid: string): Promise<object>{
    return this.get(URLS.v2.transactions.detail.replace(':tid',tid))
  }

  /**
   * 根据id查看未确认交易详情
   * @param tid 交易id
   */
  public async getUnconfirmedTransactionDetail(tid: string): Promise<object>{
    return this.get(URLS.transactions.uncomfirmed_detail,{id:tid})
  }

  /**
   * 获取[全网所有]未确认的交易详情
   * 接口说明：如果不加参数，则会获取全网所有未确认交易
   * @param senderPublicKey 发送者公钥
   * @param address 地址
   */
  public async queryUnconfirmedTransactions(senderPublicKey: string='', address: string=''): Promise<object>{
    let params:ObjectType ={
    }
    if (senderPublicKey.length>0) {
      params[senderPublicKey]=senderPublicKey
    }
    if (address.length>0) {
      params[address]=address
    }

    return this.get(URLS.transactions.uncomfirmed, params)
  }

  /**
   * 获取转账记录
   * @param limit 返回个数限制（默认20）
   * @param offset 偏移量
   * @param ownerId 发送/接收者ID
   * @param currency 币种
   */
  public async queryTransfers(offset:number=0, limit: number=20, ownerId:string='', currency:string=''): Promise<object>{
    let params:ObjectType ={
      offset:offset,
      limit:limit,
    }
    if (ownerId.length>0) {
      params[ownerId]=ownerId
    }
    if (currency.length>0) {
      params[currency]=currency
    }
    return this.get(URLS.v2.transfers.list,params)
  }

  /**
   *  根据区块ID获取指定区块的详情
   * @param id 区块id
   */
  public async getBlockDetailById(id:string): Promise<object>{
    return this.get(URLS.blocks.detail,{id:id})
  }

  /**
   *  根据区块高度获取指定区块的详情
   * @param height 区块高度
   */
  public async getBlockDetailByHeight(height: number): Promise<object>{
    return this.get(URLS.blocks.detail,{height:height})
  }

  /**
   *  根据区块hash获取指定区块的详情
   * @param hash 区块hash
   */
  public async getBlockDetailByHash(hash:string): Promise<object>{
    return this.get(URLS.blocks.detail,{hash:hash})
  }

  /**
   * 获取区块列表
   * @param limit 个数限制
   * @param offset 偏移量
   * @param orderBy height:desc或者height:asc(目前提供的排序方法)
   */
  public async queryBlocks(offset: number=0, limit: number=20, orderBy: string='height:desc'): Promise<object>{
    return this.get(URLS.v2.blocks.list,{
      offset:offset,
      limit:limit,
      orderBy:orderBy
    })
  }

  /**
   *  根据id或高度获取区块详情
   * @param idOrHeight id或高度
   */
  public async getBlockDetailByIdOrHeight(idOrHeight: string): Promise<object>{
    return this.get(URLS.v2.blocks.detail.replace(':idOrHeight',idOrHeight))
  }

  /**
   * 获取区块链高度
   */
  public async getBlocksHeight(): Promise<object>{
    return this.get(URLS.blocks.height)
  }

  /**
   * 获取里程碑信息
   */
  public async getMilestone(): Promise<object>{
    return this.get(URLS.blocks.milestone)
  }

  /**
   * 查看单个区块奖励
   */
  public async getBlockReward(): Promise<object>{
    return this.get(URLS.blocks.reward)
  }

  /**
   * 获取XAS当前供应量
   */
  public async getXASSupply(): Promise<object>{
    return this.get(URLS.blocks.supply)
  }

  /**
   * 获取区块链状态
   */
  public async getBlockchainStatus(): Promise<object>{
    return this.get(URLS.blocks.status)
  }

  /**
   * 根据区块ID获取指定区块的交易信息
   * @param id 区块id
   */
  public async getBlockFullDetailById(id: string): Promise<object>{
    return this.get(URLS.blocks.full,{id:id})
  }

  /**
   * 根据区块高度获取指定区块的交易信息
   * @param height 区块高度
   */
  public async getBlockFullDetailByHeight(height: number|string): Promise<object>{
    return this.get(URLS.blocks.full,{height:height})
  }

  /**
   * 获取受托人总个数
   */
  public async getDelegatesCount(): Promise<object>{
    return this.get(URLS.delegates.count)
  }

  /**
   * 根据受托人名字查看哪些人为其投了票
   * @param name 受托人名字
   */
  public async getVotersOfDelegate(name: string): Promise<object>{
    return this.get(URLS.delegates.voters,{name:name})
  }

  // /**
  //  * 根据公钥获取受托人详情
  //  * @param publickey 受托人公钥
  //  */
  // public async getDelegateDetailByPublickey(publickey: string): Promise<object>{
  //   return this.get(URLS.delegates.detail,{publickey:publickey})
  // }

  /**
   * 根据地址获取受托人详情
   * @param address 受托人地址
   */
  public async getDelegateDetailByAddress(address: string): Promise<object>{
    return this.get(URLS.delegates.detail,{address:address})
  }

  /**
   * 根据用户名获取受托人详情
   * @param name 受托人用户名
   */
  public async getDelegateDetailByName(name: string): Promise<object>{
    return this.get(URLS.delegates.detail,{name:name})
  }

  /**
   * 获取受托人列表
   * 接口说明：如果不加参数则会返回全网受托人列表
   * @param offset 偏移量，最小值：0
   * @param limit 数量
   * @param orderBy 排序字段:排序规则，如:desc
   */
  public async queryDelegates(offset: number=0, limit: number=20, orderBy: string='vote:desc'): Promise<object>{
    return this.get(URLS.delegates.list,{
      offset:offset,
      limit:limit,
      orderBy:orderBy
    })
  }

  /**
   * 受托人锻造状态查看
   * @param publicKey 公钥
   */
  public async getForgingStatusOfDelegate(publicKey: string): Promise<object>{
    return this.get(URLS.delegates.forging_status,{publicKey:publicKey})
  }

  /**
   * 获取当前节点连接的所有节点信息
   * 备注：展示节点只是和本机有连接的节点，并不是全网所有的节点
   * @param limit 数量限制
   * @param offset 偏移量
   */
  public async queryPeers(offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.peers.list,{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 获取当前节点版本号等信息
   */
  public async getPeerVersion(): Promise<object>{
    return this.get(URLS.peers.version)
  }

  /**
   * 获取指定ip节点信息
   * @param ip 待查询节点ip
   * @param port 待查询节点端口，1~65535
   */
  public async getPeerDetail(ip: string, port: number): Promise<object>{
    return this.get(URLS.peers.detail,{ip:ip, port:port})
  }

  /**
   * 查看当前节点区块链加载状态
   */
  public async getLoaderStatus(): Promise<object>{
    return this.get(URLS.loder.status)
  }

  /**
   * 查看区块同步信息
   */
  public async getLoaderStatusSync(): Promise<object>{
    return this.get(URLS.loder.status_sync)
  }

  /**
   * 获取提案列表
   * @param offset 偏移量
   * @param limit 数量限制
   */
  public async queryProposals(offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.proposals.list,{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 根据提案id获取提案详情
   * @param pid 提案id
   */
  public async getProposalDetail(pid: string): Promise<object>{
    return this.get(URLS.v2.proposals.detail.replace(':id',pid))
  }

  /**
   * 获取网关列表
   * @param offset 偏移量
   * @param limit 数量限制
   */
  public async queryGateways(offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.gateways.list,{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 获取指定网关的验证者
   * @param gateway 网关名字
   */
  public async queryValidatorsOfGateway(gateway: string): Promise<object>{
    return this.get(URLS.v2.gateways.validators.replace(':name',gateway))
  }

  /**
   * 获取支持的所有跨链币种
   */
  public async queryAllCurrenciesOfGateways(): Promise<object>{
    return this.get(URLS.v2.gateways.currencies_all)
  }

  /**
   * 获取指定网关的支持币种
   * @param gateway 网关名称
   */
  public async queryCurrenciesOfGateway(gateway: string): Promise<object>{
    return this.get(URLS.v2.gateways.currencies_one.replace(':name',gateway))
  }

  /**
   * 获取指定网关的指定账户
   * @param gateway 网关名字
   * @param address 账户地址
   */
  public async getAccountOfGateway(gateway: string, address: string): Promise<object>{
    return this.get(URLS.v2.gateways.account_one.replace(':name',gateway).replace(':address',address))
  }

  /**
   * 获取指定用户地址的所有网关账户
   * @param address 
   */
  public async queryAccountsOfGateway(address: string): Promise<object>{
    return this.get(URLS.v2.gateways.account_all.replace(':address',address))
  }

  /**
   * 获取指定用户地址指定币种的所有充值记录
   * @param address 账户地址
   * @param currency 币种
   */
  public async querDepositsToGateway(address: string, currency: string): Promise<object>{
    return this.get(URLS.v2.gateways.deposits.replace(':address',address).replace(':currency',currency))
  }

  /**
   * 获取指定用户地址指定币种的所有提现记录
   * @param address 账户地址
   * @param currency 币种
   */
  public async querWithdrawalsFromGateway(address: string, currency: string): Promise<object>{
    return this.get(URLS.v2.gateways.withdrawals.replace(':address',address).replace(':currency',currency))
  }

  /**
   * 获取所有代理人账户
   * @param offset 偏移量
   * @param limit 数量限制
   */
  public async queryAgents(offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.agents.list, {
      offset:offset,
      limit:limit
    })
  }

  /**
   * 获取某个代理下的委托客户
   * @param agent 代理人名字
   */
  public async queryClientelesOfAgent(agent: string): Promise<object>{
    return this.get(URLS.v2.agents.clienteles.replace(':name',agent))
  }

  /**
   * 获取Group信息
   * @param address Group地址
   */
  public async queryGroups(address: string): Promise<object>{
    return this.get(URLS.v2.agents.group.replace(':address',address))
  }

  /**
   * 获取所有已注册侧链
   * @param offset 偏移量
   * @param limit 数量限制
   */
  public async querySideChainsRegistered(offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.chains.list,{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 获取全网所有发行商
   * @param offset 偏移量，最小值0
   * @param limit 限制结果集个数，最小值：0,最大值：100
   */
  public async queryIssuers(offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.uia.issuers_list,{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 查询指定发行商的信息
   * @param address 账户地址
   */
  public async getIssuerDetail(address: string): Promise<object>{
    return this.get(URLS.v2.uia.issuers_detail.replace(':address',address))
  }

  /**
   * 查看指定发行商的资产
   * @param address 账户地址
   * @param offset 偏移量，最小值0
   * @param limit 限制结果集个数，最小值：0,最大值：100
   */
  public async queryAssetsOfIssuer(address: string, offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.uia.assets_one.replace(':address',address),{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 获取全网所有资产信息
   * @param limit 限制结果集个数，最小值：0,最大值：100
   * @param offset 偏移量，最小值0
   */
  public async querAllAssets(offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.uia.assets_all,{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 获取指定资产信息
   * @param currency 资产名
   */
  public async getAssetDetail(currency: string): Promise<object>{
    return this.get(URLS.v2.uia.assets_detail.replace(':name',currency))
  }

  /**
   * 获取指定账户所有uia的余额
   * @param address 账户地址
   * @param offset 偏移量，最小值0
   * @param limit 限制结果集个数，最小值：0,最大值：100
   */
  public async queryAssetBalances(address: string, offset: number=0, limit: number=20): Promise<object>{
    return this.get(URLS.v2.uia.balances.replace(':address',address),{
      offset:offset,
      limit:limit
    })
  }

  /**
   * 查询智能合约列表
   * @param name 合约名称
   * @param ownerId 创建人地址
   * @param address 合约地址
   * @param offset 偏移量，最小值0
   * @param limit 限制结果集个数，最小值：0,最大值：100
   */
  public async queryContracts(name:string='',ownerId:string='', address: string='',offset: number=0, limit: number=20): Promise<object>{
    let params:ObjectType ={
      offset:offset,
      limit:limit,
    }
    if (name.length>0) {
      params[name]=name
    }
    if (ownerId.length>0) {
      params[ownerId]=ownerId
    }
    if (address.length>0) {
      params[address]=address
    }
    return this.get(URLS.v2.contracts.list,params)
  }

  /**
   * 查询智能合约详细信息
   * @param name 合约名称
   */
  public async getContractDetail(name: string): Promise<object>{
    return this.get(URLS.v2.contracts.detail.replace(':name',name))
  }

  /**
   * 查询智能合约代码
   * @param name 合约名称
   */
  public async getCodeOfContract(name: string): Promise<object>{
    return this.get(URLS.v2.contracts.code.replace(':name',name))
  }

  /**
   * 查询智能合约元数据
   * @param name 合约名称
   */
  public async getMetadataOfContract(name: string): Promise<object>{
    return this.get(URLS.v2.contracts.metadata.replace(':name',name))
  }

  /**
   *  查询智能合约公开状态
   * @param name 合约名称
   * @param path 状态的路径，状态路径是用'.'号分隔的一个字符串，表示要查询的状态所在的合约对象的位置。
   * 如：
   * 'amount'表示查询合约的amount属性，
   * 'payments.0'表示payments对象的第0个元素，
   * 'paymentOfAddress.ABuH9VHV3cFi9UKzcHXGMPGnSC4QqT2cZ5'表示合约的paymentOfAddress['ABuH9VHV3cFi9UKzcHXGMPGnSC4QqT2cZ5']。
   * 以此类推
   * 
   * ~~~
   * 需要注意的是，该方法仅可查询公开的简单属性的值，否则会失败。
   * 如amount是private的则查询会失败。如paymentOfAddress的类型是Mapping<Payment>这种复杂类型，查询也会失败。
   * 如需实现更复杂的查询，请参考智能合约开发文档，使用查询方法
   * ~~~
   * 
   */
  public async queryStatesOfContract(name: string, path:string): Promise<object>{
    return this.get(URLS.v2.contracts.states.replace(':name',name).replace(':path',path))
  }

  /**
   * 查询智能合约执行结果
   * @param name 合约名称
   * @param tid 执行合约的交易Id
   */
  public async getResultOfContract(name: string, tid: string): Promise<object>{
    return this.get(URLS.v2.contracts.results.replace(':name',name).replace(':tid',tid))
  }

  /**
   * 调用查询方法
   * @param name 合约名称
   * @param method 查询方法名称
   * @param args 查询方法参数数组，以json形式放在请求的body中。查询方法参数必须是数组，如果没有参数请使用空数组
   */
  public async callConstantMethod(name: string, method: string, args: Array<any>=[]): Promise<object>{
    return this.post(URLS.v2.contracts.constants_method.replace(':name',name).replace(':method',method),args)
  }

  /**
   * 
   * 以下接口为事务接口
   * 
  */

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
   * 添加Dapp委托人
   * @param dappId Dapp ID
   * @param key 委托人公钥
   */
  public async addBooker(dappId: string, key: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.addBooker(dappId, key)
    trx = await this.aschWeb.sign(trx)
    return this.broadcastTransaction(trx)
  }

  /**
   * 删除Dapp委托人
   * @param dappId Dapp ID
   * @param key 委托人公钥
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
