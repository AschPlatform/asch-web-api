import * as utils from './utils'
import { API } from './api'
import { AschAPI } from './asch-api'
import { TransactionBuilder } from './builders'
import { ObjectType, Method, Transaction, Keys, Network, NET_TYPE } from './type'
import { Provider, HTTPProvider } from './providers'

type CallbackType = (
  trx: Transaction
) => { signatures: string[]; secondSignature?: string; senderPublicKey: string }

export default class AschWeb {
  defaultAccount: any
  secret: string // 12个助记词或者私钥
  secondSecret: string
  // host: string
  api
  utils
  //  public network: Network
  public provider: Provider
  // public api : AschAPI
  //  constructor(url: string, secret: string, secondSecret: string = '', headers?: ObjectType) {
  //    this.host = url
  //    this.secret = secret
  //    this.secondSecret = secondSecret
  //    this.api = new API(url, headers)
  //    this.utils = utils
  //    this.defaultAccount = { address: '' }
  //    this.network={host:'http://',isMainnet:true}
  //  }

  constructor(provider: Provider, secret: string = '', secondSecret: string = '') {
    this.provider = provider
    this.secret = secret
    this.secondSecret = secondSecret
    //  this.api = new API(provider)
    this.api = new AschAPI(this)
    this.utils = utils
    this.defaultAccount = { address: '' }
    // this.network={host:'http://',isMainnet:true}
  }

  //  getHost(): string {
  //    return this.host
  //  }
  //  setHost(url: string) {
  //    this.host = url
  //  }

  public setSecondSecret(secondSecret: string) {
    this.secondSecret = secondSecret
  }

  public setHttpProvider(url: string, type: string = NET_TYPE[0]) {
    let provider = new HTTPProvider(url, 3000, type)
    this.provider = provider
    this.api.provider = provider
  }

  /**
   * 所有交易的签名函数
   * @param unsignedTrx
   */
  public fullSign(unsignedTrx: Transaction): Transaction {
    // console.log('secret:'+this.secret)
    let keys: Keys = utils.getKeys(this.secret)
    console.log('Keys:' + JSON.stringify(keys))
    // let publicKey =utils.getKeys(this.secret).publicKey
    // let address = utils.getAddressByPublicKey(publicKey)
    unsignedTrx.senderPublicKey = keys.publicKey
    unsignedTrx.senderId = utils.getAddressByPublicKey(keys.publicKey)
    let trx = utils.sign(unsignedTrx, this.secret)
    if (this.secondSecret != null && this.secondSecret.length > 0) {
      trx = utils.secondSign(trx, this.secondSecret)
    }
    trx.id = new Buffer(utils.getId(trx)).toString('hex')
    return trx
  }

  public transferXAS(amount: number, recipientId: string, message: string): Promise<object> {
    let trx: Transaction = TransactionBuilder.transferXAS(amount, recipientId, message)

    trx = this.fullSign(trx)
    return this.api.broadcastTransaction(trx)
  }

  contract(name: string): Promise<object> {
    try {
      return this.api.get(`/api/v2/contracts/${name}`).then(res => {
        if (res && res.contract) {
          return new Contract(res.contract, this.api)
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

class Contract {
  name: string
  methods: Map<string, Method>
  consumeOwnerEnergy: boolean
  originalContract: ObjectType
  api: ObjectType
  metadata: ObjectType

  constructor(contract: ObjectType, api: ObjectType) {
    this.name = contract.name
    let methods = contract.metadata.methods
    this.metadata = contract.metadata
    this.consumeOwnerEnergy = contract.consumeOwnerEnergy === 1
    this.methods = this.initMethods(methods)
    this.originalContract = contract
    this.api = api
  }
  initMethods(methdos: Array<Method>) {
    let methodsMap = new Map<string, Method>()
    //  TODO change method data
    for (let method of methdos) {
      let { name, returnType, parameters, isPublic, isPayable } = method
      if (isPublic && returnType) {
        methodsMap[name] = {
          name,
          returnType,
          parameters,
          isPayable
        }
      }
    }
    this.methods = methodsMap
    return methodsMap
  }
  //  TODO
  call(
    methodName: string,
    args: Array<any> = [],
    address: string,
    options: ObjectType = {},
    callback: any
  ) {
    try {
      if (methodName in this.methods && !this.methods[methodName].isConstant) {
        //  let method = this.methods[name]
        //  let {
        //    parameters
        //  } = method
        //  validate
        let trx = TransactionBuilder.callContract(
          options.gasLimit || 10000000,
          options.enablePayGasInXAS || false,
          this.name,
          methodName,
          args
        )
        trx.senderId = address
        callback(trx, trans => {
          return this.api.broadcastTransaction(trans)
        })
      } else {
        return `contract has no method called ${methodName}`
      }
    } catch (e) {
      return e
    }
  }

  async pay(
    path: string,
    amount: string,
    currency: string,
    address: string,
    options: ObjectType = {},
    callback: any
  ) {
    try {
      let pathPrefix = path.split('/')[0]
      let pathSuffix = path.split('/')[1] || ''
      if (
        (pathSuffix && pathSuffix in this.methods && !this.methods[pathPrefix].isPayable) ||
        (!pathSuffix && pathPrefix === this.name)
      ) {
        //  let method = this.methods[name]
        //  let {
        //    parameters
        //  } = method
        let trx = TransactionBuilder.payContract(
          options.gasLimit || 10000000,
          options.enablePayGasInXAS || false,
          path,
          amount,
          currency
        )
        trx.senderId = address
        callback(trx, trans => {
          return this.api.broadcastTransaction(trans)
        })
      } else {
        return `contract has no method called ${name}`
      }
    } catch (e) {
      return e
    }
  }

  constans(methodName: string, args: Array<any>) {
    try {
      if (
        methodName in this.methods &&
        this.methods[methodName].isConstant &&
        args instanceof Array
      ) {
        return this.api.get(`${this.name}/constant/${methodName}/${JSON.stringify(args)}`)
      } else {
        return `constans get error`
      }
    } catch (e) {
      return e
    }
  }

  queryStates(path: string) {
    try {
      if (path) {
        return this.api.get(`${this.name}/states/${path}`)
      } else {
        return `path is required`
      }
    } catch (e) {
      return e
    }
  }
}
