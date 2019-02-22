import { Provider, HTTPProvider, AutoProvider } from './providers'
import { ObjectType } from './type'
import { TransactionBuilder } from './builders'
import { Transaction } from './type'
import * as utils from './utils'

class Version {
  _apiVersion: string = ''
  _nodeVersion: string = ''
  _networkVersion: string = ''
  _consensusVersion: string = ''

  get api() {
    return this._apiVersion
  }
  get node() {
    return this._nodeVersion
  }
  get network() {
    return this._networkVersion
  }
  get consensus() {
    return this._consensusVersion
  }

  protected setApi(v: string) {
    this._apiVersion = v
  }
  protected setNode(v: string) {
    this._apiVersion = v
  }
  protected setNetwork(v: string) {
    this._apiVersion = v
  }
  protected setConsensus(v: string) {
    this._apiVersion = v
  }
}

export class API {
  _provider: Provider
  // _privateKey: string
  _version: Version
  _headers?: ObjectType

  constructor(p: Provider | string, headers?: ObjectType) {
    if (typeof p === 'string') {
      this._provider = new HTTPProvider(p)
    } else {
      this._provider = p
    }
    // this._privateKey = key
    this._version = new Version()
    this._headers = headers
    this.connect()
  }

  get provider() {
    return this._provider
  }

  set provider(p: Provider) {
    this._provider = p
  }

  // get account
  // get address
  // get privateKey

  public isConnected(): boolean {
    return true
  }

  public useHttpProvider(url: string) {
    this._provider = new HTTPProvider(url)
  }

  public useAutoProvider() {
    this._provider = new AutoProvider()
  }

  // public setPrivateKey(key: string) {
  //   this._privateKey = key
  // }

  public broadcastTransaction(trx: Transaction) {
    let headers = Object.assign(
      {
        //magic: '594fe0f3', // local
        magic: '5f5b3cf5', // mainnet
        version: '',
        'Content-Type': 'application/json'
      },
      this._headers
    )
    return this._provider.post(
      `/peer/transactions`,
      {
        transaction: trx
      },
      {
        headers: headers
      }
    )
  }

  public get(uri: string, params: object): Promise<object> {
    return this._provider.get(uri, params)
  }

  // public post(uri: string, params: object): Promise<object> {
  //   return this._provider.post(uri, params)
  // }

  public contract(name: string): Promise<object> {
    return this._provider.get(`/contracts/${name}`, {})
  }

  private connect() {
    return true
  }
}
