import * as utils from './utils'
import { API } from './API'
import { transactionBuilder } from './builders'
import { Account, ObjectType, Method, Transaction } from './type'
import { stringify } from 'querystring'

type CallbackType = (
  trx: Transaction
) => { signatures: string[]; secondSignature?: string; senderPublicKey: string }

export default class AschWeb {
  defaultAccount: any
  host: string
  api
  utils
  constructor(url) {
    this.host = url
    this.api = new API(url)
    this.utils = utils
  }

  getHost(): string {
    return this.host
  }

  async contract(name: string): Promise<object> {
    try {
      let res = await this.api.get(`/contract/${name}`)
      if (res.data && res.data.contract) {
        return new Contract(res.data.contract, this.api)
      } else {
        return res
      }
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

  constructor(contract: ObjectType, api: ObjectType) {
    this.name = contract.name
    let methods = contract.methods
    this.consumeOwnerEnergy = contract.consumeOwnerEnergy === 1
    this.methods = this.initMethods(methods)
    this.originalContract = contract
    this.api = api
  }
  initMethods(methdos: Array<Method>) {
    let methodsMap = new Map<string, Method>()
    // TODO change method data
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

  async call(
    methodName: string,
    args: Array<any> = [],
    address: string,
    options: ObjectType = {},
    callback: CallbackType
  ) {
    try {
      if (methodName in this.methods && !this.methods[methodName].isConstant) {
        // let method = this.methods[name]
        // let {
        //   parameters
        // } = method
        // validate
        let trx = transactionBuilder({
          type: 601,
          fee: 0,
          args: [
            options.gasLimit || 10000000,
            options.enablePayGasInXAS || false,
            this.name,
            methodName,
            args
          ],
          senderId: address,
          signatures: []
        })

        // return trx
        let { signatures, secondSignature = '', senderPublicKey } = callback(trx)
        trx.signatures = signatures
        trx.secondSignature = secondSignature
        trx.senderPublicKey = senderPublicKey
        return this.api.broadcastTransaction(trx)
      } else {
        return `contract has no method called ${methodName}`
      }
    } catch (e) {
      return e
    }
  }

  async pay(
    methodName: string,
    amount: string,
    currency: string,
    address: string,
    options: ObjectType = {},
    callback: CallbackType
  ) {
    if (methodName in this.methods && !this.methods[methodName].isConstant) {
      // let method = this.methods[name]
      // let {
      //   parameters
      // } = method
      let trx = transactionBuilder({
        type: 601,
        fee: 0,
        args: [
          options.gasLimit || 10000000,
          options.enablePayGasInXAS || false,
          options.receiverPath || this.name,
          amount,
          currency
        ],
        senderId: address,
        signatures: []
      })
      let { signatures, secondSignature = '', senderPublicKey } = callback(trx)
      trx.signatures = signatures
      trx.secondSignature = secondSignature
      trx.senderPublicKey = senderPublicKey
      return this.api.broadcastTransaction(trx)
      // return trx
    } else {
      return `contract has no method called ${name}`
    }
  }

  async constans(methodName: string, args: Array<any>) {
    try {
      if (
        methodName in this.methods &&
        this.methods[methodName].isConstant &&
        args instanceof Array
      ) {
        let res = await this.api.get(`${this.name}/constant/${methodName}/${JSON.stringify(args)}`)
        return res
      } else {
        return `constans get error`
      }
    } catch (e) {
      return e
    }
  }

  async queryStates(path: string) {
    try {
      if (path) {
        let res = await this.api.get(`${this.name}/states/${path}`)
        return res
      } else {
        return `path is required`
      }
    } catch (e) {
      return e
    }
  }
}
