import { ObjectType, Method, Transaction } from './type'
import { TransactionBuilder } from './builders'
import { API } from './api'
import AschAPI from './asch-api'
import { resolve } from 'url'

export class AschContract {
  name: string
  methods: Map<string, Method>
  consumeOwnerEnergy: boolean
  originalContract: ObjectType
  api: ObjectType
  metadata: ObjectType

  constructor(contract: ObjectType, api: AschAPI) {
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
      let {
        name,
        returnType,
        parameters,
        isConstructor,
        isPublic,
        isDefaultPayable,
        isPayable,
        isConstant
      } = method
      if (isPublic && returnType) {
        let method: Method = {
          name,
          returnType,
          parameters,
          isConstructor,
          isPublic,
          isDefaultPayable,
          isPayable,
          isConstant
        }
        methodsMap.set(name, method)
      }
    }
    this.methods = methodsMap
    return methodsMap
  }



  /**
   * 调用合约方法
   * @param methodName 
   * @param methodArgs 
   * @param gasLimit 
   * @param enablePayGasInXAS 
   */
  public async call(
    methodName: string,
    methodArgs: Array<any>,
    gasLimit: number,
    enablePayGasInXAS: boolean
  ): Promise<object> {
    try {
      let method: Method | undefined = this.methods.get(methodName)
      if (this.methods.has(methodName) && method && !method.isConstant) {
        return this.api.callContract(this.name, methodName, methodArgs, gasLimit, enablePayGasInXAS)
      } else {
        return Promise.reject(`contract has no method called ${methodName}`)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  // /**
  //  * 转账到合约
  //  * @param currency
  //  * @param amount
  //  * @param receiverPath
  //  * @param gasLimit
  //  * @param enablePayGasInXAS
  //  * @param callback
  //  */
  // public async pay(
  //   currency: string,
  //   amount: string,
  //   receiverPath: string,
  //   gasLimit: number,
  //   enablePayGasInXAS: boolean,
  //   callback?: any
  // ) {
  //   try {
  //     let pathPrefix = receiverPath.split('/')[0]
  //     let pathSuffix = receiverPath.split('/')[1] || ''
  //     let method: Method | undefined = this.methods.get(pathSuffix)
  //     if (
  //       (pathSuffix && this.methods.has(pathSuffix) && method && method.isPayable) ||
  //       (!pathSuffix && pathPrefix === this.name)
  //     ) {
  //       return this.api.payContract(currency, amount, receiverPath, gasLimit, enablePayGasInXAS)
  //     } else {
  //       return Promise.reject(`contract has no method called ${method ? method.name : ''}`)
  //     }
  //   } catch (e) {
  //     return Promise.reject(e)
  //   }
  // }

  /**
   * 转账到合约
   * @param currency 
   * @param amount
   * @param receiverPath
   * @param gasLimit
   * @param enablePayGasInXAS
   * @param callback
   */
  public async pay(
    currency: string,
    amount: string,
    receiverPath: string,
    gasLimit: number,
    enablePayGasInXAS: boolean
  ): Promise<object>{
    try {
      let pathPrefix = receiverPath.split('/')[0]
      let pathSuffix = receiverPath.split('/')[1] || ''
      let method: Method | undefined = this.methods.get(pathSuffix)
      if (
        (pathSuffix && this.methods.has(pathSuffix) && method && method.isPayable) ||
        (!pathSuffix && pathPrefix === this.name)
      ) {
        return this.api.payContract(currency, amount, receiverPath, gasLimit, enablePayGasInXAS)
      } else {
        return Promise.reject(`contract has no method called ${method ? method.name : ''}`)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }


  constans(methodName: string, args: Array<any>) {
    try {
      let method: Method | undefined = this.methods.get(methodName)
      if (this.methods.has(methodName) && method && method.isConstant && args instanceof Array) {
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
