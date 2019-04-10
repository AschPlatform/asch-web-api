import { Network, Provider, HTTPProvider, AutoProvider } from './providers'
import { ObjectType } from './type'
import { Transaction } from './type'

export class API {
  _provider: Provider

  /**
   * 构造函数
   * @param p provider
   */
  constructor(p: Provider | string) {
    if (typeof p === 'string') {
      this._provider = new HTTPProvider(p, Network.Test)
    } else {
      this._provider = p
    }
    this.connect()
  }

  get provider() {
    return this._provider
  }

  set provider(p: Provider) {
    this._provider = p
  }

  public isConnected(): boolean {
    return true
  }

  public useHttpProvider(url: string) {
    this._provider = new HTTPProvider(url)
  }

  public useAutoProvider() {
    this._provider = new AutoProvider()
  }

  public broadcastTransaction(trx: Transaction) {
    return this._provider.post(`/peer/transactions`, {
      transaction: trx
    })
  }

  public get(uri: string, params?: object): Promise<object> {
    return this._provider.get(uri, params)
  }

  public post(uri: string, params: object): Promise<object> {
    return this._provider.post(uri, params)
  }

  public contract(name: string): Promise<object> {
    return this._provider.get(`/contracts/${name}`, {})
  }

  private connect() {
    return true
  }
}
