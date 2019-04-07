import * as utils from './utils'
import AschAPI from './asch-api'
import { Transaction, ObjectType } from './type'
import { Provider, HTTPProvider, Network } from './providers'
import { AschContract } from './asch-contract'

import { TransactionBuilder } from './builders'
import * as Constants from './constants'
import * as Utils from './utils'
import * as AschType from './type'
// export * from './type'
// import {ContractMetadataMananger } from './contract/metadata'

// const Asch = { Provider, HTTPProvider, Network, TransactionBuilder, Constants, Utils }
// export { Provider, HTTPProvider, Network, TransactionBuilder, Constants, Utils }

type CallbackType = (
  trx: Transaction
) => { signatures: string[]; secondSignature?: string; senderPublicKey: string }

type Callback = (err: any, trx?: Transaction) => Transaction | undefined
// export {ContractMetadataMananger}

export default class AschWeb {
  static Provider=Provider
  static HTTPProvider=HTTPProvider
  static Network=Network
  static TransactionBuilder=TransactionBuilder
  static Constants=Constants
  static Utils=Utils
  static AschType=AschType
  
  utils: any
  defaultAccount: any
  secret: string //12个助记词或者私钥
  secondSecret: string
  public provider: Provider
  public api: AschAPI
  injectPromise: any
  // public contract: AschContract

  constructor(provider: Provider, secret: string, secondSecret: string = '') {
    this.provider = provider
    this.secret = secret
    this.secondSecret = secondSecret
    this.api = new AschAPI(this)
    this.utils = utils
    this.defaultAccount = { address: '' }
    this.injectPromise = utils.promiseInjector(this)
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
    return utils.fullSign(unsignedTrx, this.secret, this.secondSecret)
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
      const trx: Transaction = utils.fullSign(unsignedTrx, secret, secondSecret)
      return callback(null, trx)
    } catch (ex) {
      callback(ex)
    }
  }

  /**
   * 从meta data创建合约对象
   * @param metaData
   */
  public createContractFromMeta(metaData: ObjectType): AschContract {
    return new AschContract(metaData, this.api)
  }

  /**
   * 从合约名称创建合约对象
   * @param name
   */
  public createContractFromName(name: string): Promise<object> {
    try {
      return this.api.get(`/api/v2/contracts/${name}`, {}).then((res: ObjectType) => {
        if (res && res.contract) {
          return this.createContractFromMeta(res.contract)
        } else {
          return res
        }
      })
    } catch (e) {
      console.log(e)
      return e
    }
  }
}
