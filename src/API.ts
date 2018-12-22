import { Provider, HTTPProvider, AutoProvider } from './providers'

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

export default class API {
  _provider: Provider
  _privateKey: string
  _version: Version

  constructor(p: Provider, key: string = '') {
    this._provider = p
    this._privateKey = key
    this._version = new Version()

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

  public setPrivateKey(key: string) {
    this._privateKey = key
  }

  public broadcastTransaction(confirmsToWait: number = 0): Promise<object> {
    return Promise.resolve({})
  }

  public get(uri: string, params: object): Promise<object> {
    return Promise.resolve({})
  }

  public contract(id: string): Promise<object> {
    return Promise.resolve({})
  }

  private connect() {
    return true
  }
}