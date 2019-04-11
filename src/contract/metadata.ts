// import { assert } from '../util/common'
// import { Messages } from '../util/messages'

export const CONTRACT_INITIALIZER_METHOD = '__init__'
export interface ParameterMetadata {
  index: number
  name: string
  type: TypeInfo
  optional: boolean
}

export interface TypeInfo {
  text: string
  name: string
  kind: TypeKind
  typeArguments?: TypeInfo[]
}

export enum TypeKind {
  unknow = -1,
  primitive = 0,
  stateCollection = 1,
  customeState = 2,
  array = 11,
  interface = 12
}

export interface MethodMetadata {
  name: string
  parameters: ParameterMetadata[]
  returnType?: TypeInfo
  public: boolean
  isConstructor?: boolean
  payable?: boolean
  defaultPayable?: boolean
  constant?: boolean
}

export interface StateMetadata {
  name: string
  public: boolean
  readonly: boolean
  type: TypeInfo
}

export interface PropertyMetadata {
  name: string,
  optional: boolean
  type: TypeInfo
}

export interface ConstVariable {
  name: string
  type: TypeInfo
}

export interface DataInterface {
  name: string
  flat: boolean
  properties: PropertyMetadata[]
}

export interface CustomeStateType {
  name: string
  flat: boolean
  constructorMethod?: MethodMetadata
  properties: PropertyMetadata[]
}

export interface ContractMetadataObject {
  className: string
  constVariables: ConstVariable[]
  dataInterfaces: DataInterface[]
  customeTypes: CustomeStateType[]
  states: StateMetadata[]
  methods: MethodMetadata[]
}

export interface ContractMetadata extends ContractMetadataObject {
  getInterfaceType(name: string): DataInterface | undefined
  getCustomeType(nane: string): CustomeStateType | undefined
  getState(name: string): StateMetadata | undefined
  getMethod(name: string): MethodMetadata | undefined
  updateMethod(name: string, method: MethodMetadata): void
  toJSONObject(): ContractMetadataObject
}

export class ContractMetadataMananger implements ContractMetadata {
  private _className = ''
  private _constVariables = new Map<string, ConstVariable>()
  private _interfaces = new Map<string, DataInterface>()
  private _customeTypes = new Map<string, CustomeStateType>()
  private _states = new Map<string, StateMetadata>()
  private _methods = new Map<string, MethodMetadata>()

  static fromJSONObject(json: ContractMetadataObject): ContractMetadataMananger {
    const metadata = new ContractMetadataMananger()
    metadata._className = json.className
    json.methods.forEach(m => metadata._methods.set(m.name, m))
    json.customeTypes.forEach(c => metadata._customeTypes.set(c.name, c))
    json.states.forEach(s => metadata._states.set(s.name, s))
    return metadata
  }

  toJSONObject(): ContractMetadataObject {
    return {
      className: this.className,
      constVariables: this.constVariables,
      dataInterfaces: this.dataInterfaces,
      customeTypes: this.customeTypes,
      states: this.states,
      methods: this.methods
    }
  }

  set className(value: string) {
    this._className = value
  }

  get className(): string {
    return this._className
  }

  get states(): StateMetadata[] {
   return Array.from(this._states.values())
    // return [...this._states.values()]
  }

  get methods(): MethodMetadata[] {
    return Array.from(this._methods.values())
    // return [...this._methods.values()]
  }

  get customeTypes(): CustomeStateType[] {
    return Array.from(this._customeTypes.values())
    // return [...this._customeTypes.values()]
  }

  get constVariables(): ConstVariable[] {
    return Array.from(this._constVariables.values())
    // return [...this._constVariables.values()]
  }

  get dataInterfaces(): DataInterface[] {
    return Array.from(this._interfaces.values())
    // return [...this._interfaces.values()]
  }

  updateMethod(name: string, method: MethodMetadata) {
    this._methods.delete(name)
    this._methods.set(method.name, method)
  }
  getCustomeType(name: string): CustomeStateType | undefined {
    return this._customeTypes.get(name)
  }

  getInterfaceType(name: string): DataInterface | undefined {
    return this._interfaces.get(name)
  }

  getState(name: string): StateMetadata | undefined {
    return this._states.get(name)
  }

  getMethod(name: string): MethodMetadata | undefined {
    return this._methods.get(name)
  }

  registerConstVariables(variables: ConstVariable[]): void {
    variables.forEach(variable => {
    //assert(!this._constVariables.has(variable.name), 'msg.ConstVariableExistsAlready', variable.name)

    this._constVariables.set(variable.name, variable)
    })
  }

  registerDataInterface(dataInterface: DataInterface): void {
    //assert(!this._interfaces.has(dataInterface.name), 'msg.DataInterfaceExistsAlready', dataInterface.name)
  
    this._interfaces.set(dataInterface.name, dataInterface)
  }

  registerState(state: StateMetadata): void {
    //assert(!this._states.has(state.name), msg.StateExistsAlready, state.name)

    this._states.set(state.name, state)
  }

  registerCustomeStateType(customeState: CustomeStateType): void {
    //assert(!this._customeTypes.has(customeState.name), msg.CustomeStateTypeExistsAlready, customeState.name)
    
    this._customeTypes.set(customeState.name, customeState)
  }

  registerContractClass(contract: { className: string, states: StateMetadata[], methods: MethodMetadata[] }): void {
    this._className = contract.className
    contract.states.forEach(s => this.registerState(s))
    contract.methods.forEach(m => this.registerMethod(m))
  }

  registerMethod(method: MethodMetadata): void {
    //assert(!this._methods.has(method.name), msg.MethodExistsAlready, method.name)
    //assert(!method.isConstructor || [...this.methods].every(m => !m.isConstructor), msg.InitializerMethodExistsAlready)

    this._methods.set(method.name, method)
  }

}