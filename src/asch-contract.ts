import { ObjectType, Method } from './type'
import AschAPI from './asch-api'
import { ContractMetadataMananger, ContractMetadataObject, MethodMetadata, ParameterMetadata, TypeKind,StateMetadata } from './contract/metadata'


export class AschContract {
  contractJson: ObjectType
  tid: string
  name: string
  address: string
  ownerId: string
  consumeOwnerEnergy: boolean
  desc: string
  vmVersion: string
  code: string
  metadata: ContractMetadataObject
  metadataManager: ContractMetadataMananger
  api: AschAPI
  [key: string]: any


  /**
   * constructor
   * @param contractJson 
   * @param api 
   */
  constructor(contractJson: ObjectType, api: AschAPI) {
    this.contractJson = contractJson
    this.tid = contractJson.tid
    this.name = contractJson.name
    this.address = contractJson.address
    this.ownerId = contractJson.ownerId
    this.consumeOwnerEnergy = (contractJson.consumeOwnerEnergy == 1) ? true : false
    this.desc = contractJson.desc
    this.vmVersion = contractJson.vmVersion
    this.code = contractJson.code
    this.metadata = contractJson.metadata
    this.metadataManager = ContractMetadataMananger.fromJSONObject(this.metadata)
    this.api = api
    this.initMethods(this.metadata)
  }

  /**
   * 
   * @param contractJson 
   * @param api 
   */
  static fromJSONObject(contractJson: ObjectType, api: AschAPI): AschContract {
    const contract = new AschContract(contractJson, api)
    return contract
  }

  /**
   * 
   * @param metadata 
   */
  public initMethods(metadata:ContractMetadataObject):void{
    let manager: ContractMetadataMananger= this.metadataManager
    let methods: MethodMetadata[] = manager.methods
    
    methods.forEach(method => {
        let methodCode:string=' '
        if(method.public && !method.constant && method.payable && !method.isConstructor){
          this.addPayMethod(method)
        }else if(method.public && !method.constant && !method.payable && !method.isConstructor){
          this.addCallMethod(method)
        }else if(method.public && method.constant){
          this.addConstantMethod(method)
        }
    });
    let states: StateMetadata[] = manager.states
    states.forEach(state => {
        let methodCode:string=' '
        if(state.public && state.type.kind==0){
          this.addStateMethod(state)
        }
    });
  }

  /**
   * 
   * @param methodData 
   */
  public addPayMethod(methodData: MethodMetadata): void {
    if (!this.hasOwnProperty(methodData.name)) {
      this[methodData.name] = (
        currency: string,
        amount: string,
        gasLimit: number = 1000000,
        enablePayGasInXAS: boolean = true
      ): Promise<object> => {
        return this.pay(currency, amount, methodData.name, gasLimit, enablePayGasInXAS)
      }
    } else {
      console.log('already has the method:' + methodData.name)
    }
  }

  /**
   * 
   * @param methodData 
   */
  public addCallMethod(methodData: MethodMetadata): void {
    if (!this.hasOwnProperty(methodData.name)) {
      this[methodData.name] = (
        methodArgs: Array<any>,
        gasLimit: number = 10000000,
        enablePayGasInXAS: boolean = true
      ): Promise<object> => {
        return this.call(methodData.name, methodArgs, gasLimit, enablePayGasInXAS)
      }
    } else {
      console.log('already has the method:' + methodData.name)
    }
  }

  /**
   * 
   * @param methodData 
   */
  public addConstantMethod(methodData: MethodMetadata): void {
    if (!this.hasOwnProperty(methodData.name)) {
      this[methodData.name] = (
        ...methodArgs: Array<any>  
      ): Promise<object> => {
        // console.log('addConstantMethod:'+JSON.stringify(methodArgs))
        return this.constant(methodData.name, ...methodArgs)
      }
    } else {
      console.log('already has the method:' + methodData.name)
    }
  }

  /**
   * 
   * @param stateData 
   */
  public addStateMethod(stateData: StateMetadata): void {
    let methodName = 'get'+stateData.name.substring(0,1).toUpperCase()+stateData.name.substring(1)
    if (!this.hasOwnProperty(methodName)) {
      this[methodName] = (
      ): Promise<object> => {
        return this.queryStates(stateData.name)
      }
    } else {
      console.log('already has the method:' + methodName)
    }
  }

  extractParamType(param: ParameterMetadata): string {
    switch (param.type.kind) {
      case TypeKind.unknow:
        {
          return 'any'
        }
      case TypeKind.primitive:
        {
          return param.type.name === 'bigint' ? 'string' : param.type.name
        }
      case TypeKind.stateCollection:
        {
          return 'any'
        }
      case TypeKind.customeState:
        {
          return 'any'
        }
      case TypeKind.array:
        {
          return 'any'
        }
      case TypeKind.interface:
        {
          return 'any'
        }
    }
    return 'any'
  }

  /**
   * 调用合约方法
   * @param methodName 要调用的方法名称
   * @param methodArgs 调用方法所需要的参数列表
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   * @param enablePayGasInXAS 当调用者能量不足时，是否使用XAS支付Gas
   */
  public async call(
    methodName: string,
    methodArgs: Array<any>,
    gasLimit: number = 10000000,
    enablePayGasInXAS: boolean = true
  ): Promise<object> {
    try {
      let method: MethodMetadata | undefined = this.metadataManager.getMethod(methodName)
      if (method && method.public && !method.constant && !method.payable) {
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
  //  * @deprecated
  //  */
  // public async pay(
  //   currency: string,
  //   amount: string,
  //   receiverPath: string,
  //   gasLimit: number,
  //   enablePayGasInXAS: boolean
  // ): Promise<object> {
  //   try {
  //     let pathPrefix = receiverPath.split('/')[0]
  //     let pathSuffix = receiverPath.split('/')[1] || ''
  //     let method: MethodMetadata | undefined = this.metadataManager.getMethod(pathSuffix)
  //     // let method: Method | undefined = this.methods.get(pathSuffix)
  //     if (
  //       (pathSuffix && method && method.public && method.payable) ||
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
   * @param currency 转账资产名称
   * @param amount 转账金额
   * @param methodName payable方法名字，当methodName=''时，调用默认payable方法
   * @param gasLimit 最大消耗的Gas, 10,000,000 > gasLimit > 0
   * @param enablePayGasInXAS 当调用者能量不足时，是否使用XAS支付Gas
   */
  public async pay(
    currency: string,
    amount: string,
    methodName?: string,
    gasLimit: number = 1000000,
    enablePayGasInXAS: boolean = true
  ): Promise<object> {
    try {
      if (!methodName || methodName.length==0)
        return this.api.payContract(currency, amount, this.name, '', gasLimit, enablePayGasInXAS)
      let method: MethodMetadata | undefined = this.metadataManager.getMethod(methodName)
      if (method && method.public && method.payable) {
        return this.api.payContract(currency, amount, this.name, methodName, gasLimit, enablePayGasInXAS)
      } else {
        return Promise.reject(`contract has no method called ${method ? method.name : ''}`)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }



  /**
   * 调用当前合约的查询方法
   * @param methodName 查询方法名称
   * @param args 查询方法参数数组，以json形式放在请求的body中。查询方法参数必须是数组，如果没有参数请使用空数组
   */
  public async constant(methodName: string, ... methodArgs: Array<any>): Promise<object> {
    try {
      let method: MethodMetadata | undefined = this.metadataManager.getMethod(methodName)
      if (method && method.constant && methodArgs instanceof Array) {
        // console.log('constant:'+JSON.stringify(methodArgs))
        return this.api.callConstantMethod(this.name, methodName, ...methodArgs)
      } else {
        return Promise.reject(`constant get error`)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /**
   * 查询当前合约的公开状态
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
