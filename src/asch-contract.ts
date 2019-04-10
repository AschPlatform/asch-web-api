import { ObjectType, Method} from './type'
import AschAPI from './asch-api'

export class AschContract {
  name: string
  methods: Map<string, Method>
  consumeOwnerEnergy: boolean
  originalContract: ObjectType
  api: AschAPI
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
  ): Promise<object> {
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


  /**
   * 调用当前合约的查询方法
   * @param name 合约名称
   * @param method 查询方法名称
   * @param args 查询方法参数数组，以json形式放在请求的body中。查询方法参数必须是数组，如果没有参数请使用空数组
   */
  public async constans(method: string, args: Array<any>=[]): Promise<object> {
    try {
      let methodObj: Method | undefined = this.methods.get(method)
      if (this.methods.has(method) && methodObj && methodObj.isConstant && args instanceof Array) {
        return this.api.callConstantMethod(this.name, method, args)
        //return this.api.get(`${this.name}/constant/${methodName}/${JSON.stringify(args)}`)
      } else {
        return Promise.reject(`constans get error`)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /**
   * 查询当前合约的公开状态
   * @param path 状态的路径，状态路径是用'.'号分隔的一个字符串，表示要查询的状态所在的合约对象的位置。
   */
  public async queryStates(path: string): Promise<object> {
    try {
      if (path) {
        return this.api.queryStatesOfContract(this.name, path)
        //return this.api.get(`${this.name}/states/${path}`)
      } else {
        return Promise.reject(`path is required`)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
