import * as utils from './utils'
import AschAPI from './asch-api'
import { Transaction, ObjectType } from './type'
import { Provider, HTTPProvider, Network } from './providers'
import { AschContract } from './asch-contract'
import { ContractMetadataObject } from './contract/metadata'

import { TransactionBuilder } from './builders'
import * as Constants from './constants'
import * as Utils from './utils'
import * as AschType from './type'


type CallbackType = (
  trx: Transaction
) => { signatures: string[]; secondSignature?: string; senderPublicKey: string }

type Callback = (err: any, trx?: Transaction) => Transaction | undefined

export default class AschWeb {
  static Provider = Provider
  static HTTPProvider = HTTPProvider
  static Network = Network
  static TransactionBuilder = TransactionBuilder
  static Constants = Constants
  static Utils = Utils
  static AschType = AschType
  static AschContract = AschContract

  // utils: any
  public defaultAccount: any
  public secret: string //12个助记词或者私钥
  public secondSecret: string
  public provider: Provider
  public api: AschAPI
  private injectPromise: any

  constructor(provider: Provider, secret: string, secondSecret: string = '') {
    this.provider = provider
    this.secret = secret
    this.secondSecret = secondSecret
    this.api = new AschAPI(this)
    // this.utils = utils
    this.defaultAccount = { address: '' }
    this.injectPromise = Utils.promiseInjector(this)
  }

  // getHost(): string {
  //   return this.host
  // }
  // setHost(url: string) {
  //   this.host = url
  // }

  public setProvider(provider: Provider) {
    this.provider = provider
    this.api.provider = provider
  }

  public setHttpProvider(url: string, net: Network = Network.Test) {
    let provider = new HTTPProvider(url, net)
    this.provider = provider
    this.api.provider = provider
  }

  public setSecret(secret: string) {
    this.secret = secret
  }

  public setSecondSecret(secondSecret: string) {
    this.secondSecret = secondSecret
  }

  /**
   * 所有交易的签名函数
   * @param unsignedTrx
   */
  public fullSign(unsignedTrx: Transaction): Transaction {
    return Utils.fullSign(unsignedTrx, this.secret, this.secondSecret)
  }

  public sign(
    unsignedTrx: Transaction,
    secret: string = this.secret,
    secondSecret: string = this.secondSecret,
    callback?: Callback
  ) {
    if (!callback) {
      return this.injectPromise(this.sign, unsignedTrx, secret, secondSecret)
    }
    try {
      const trx: Transaction = Utils.fullSign(unsignedTrx, secret, secondSecret)
      return callback(null, trx)
    } catch (ex) {
      callback(ex)
    }
  }

  // public sign(
  //   unsignedTrx: Transaction,
  //   secret: string = this.secret,
  //   secondSecret: string = this.secondSecret
  // ): Promise<Transaction>{
  //   // if (!callback) {
  //   //   return this.injectPromise(this.sign, unsignedTrx, secret, secondSecret)
  //   // }
  //   try {
  //     const trx: Transaction = Utils.fullSign(unsignedTrx, secret, secondSecret)
  //     return Promise.resolve(trx)
  //     //return callback(null, trx)
  //   } catch (ex) {
  //     //callback(ex)
  //     return Promise.reject(ex)
  //   }
  // }


  /**
   * 发布智能合约
   * @param name 智能合约名称，全网唯一，3 ~ 32个字母或数字组成
   * @param desc 智能合约的描述，长度不超过255的字符串
   * @param code 智能合约代码，长度不超过16K
   * @param version 合约引擎版本，目前请填v0.1
   * @param consumeOwnerEnergy 是否优先消耗合约所有者的能量
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   */
  public registerContract(
    name: string,
    desc: string,
    code: string,
    version: string='v0.1',
    consumeOwnerEnergy: boolean=true,
    gasLimit: number=1000000
    ): Promise<object> {
    return this.api.registerContract(name,desc,code,version,consumeOwnerEnergy,gasLimit)
  }


  /**
   * 从metadata创建合约对象
   * @param name 
   * @param metadata 
   */
  public createContractFromMeta(contractJson: ObjectType): AschContract {
    return new AschContract(contractJson, this.api)
  }

  /**
   * 从合约名称创建合约对象
   * @param name
   */
  public createContractFromName(name: string): Promise<object> {
    try {
      return this.api.getContractDetail(name).then((res: ObjectType) => {
        if (res && res.contract) {
          return Promise.resolve(this.createContractFromMeta(res.contract))
        } else {
          return Promise.reject(`contract get error`)
        }
      })
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }
}
