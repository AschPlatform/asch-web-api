import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosInstance, AxiosPromise } from 'axios'
import { ObjectType } from '../type'
import { Provider, Network } from './provider'
import { LOCAL_NET_MAGIC, TEST_NET_MAGIC, MAIN_NET_MAGIC } from '../constants'
export class HTTPProvider extends Provider {
  _url: string
  _timeout: number
  _net?: Network
  _instance: AxiosInstance

  constructor(url: string, net?: Network, timeout: number = 30000) {
    super()
    url = url.replace(/\/+$/, '')

    this._url = url
    this._timeout = timeout
    if (net == null) {
      this._net = Network.Test
    }
    this._net = net
    this._instance = Axios.create({
      baseURL: url,
      timeout: timeout,
      headers: this.headerForNet(net)
    })
    //debug log
    this.addLogger(this._instance)
  }

  headerForNet(net?: Network): ObjectType {
    return {
      magic:
        net == Network.Main
          ? MAIN_NET_MAGIC
          : net == Network.Test
            ? TEST_NET_MAGIC
            : LOCAL_NET_MAGIC,
      version: '',
      'Content-Type': 'application/json'
    }
  }

  /**
   * 添加loger
   * @param instance 
   */
  addLogger(instance: AxiosInstance) {
    instance.interceptors.request.use(function (config: AxiosRequestConfig) {
      console.debug((config.method ? config.method.toUpperCase() : 'unknow method') + ' ' + config.url)
      return config
    })
    instance.interceptors.response.use(function (response: AxiosResponse) {
      let config: AxiosRequestConfig = response.config
      console.debug(
        response.status + ' ' + response.statusText,
        '(' + (config && config.method ? config.method.toUpperCase() : 'unknow method' )+ ' ' + response.config.url + ')'
      )
      return response
    }, function (error) {
      if (error.config) {
        console.debug(
          error.name + ': ' + error.message,
          '(' + error.config.method.toUpperCase() + ' ' + error.config.url + ')'
        )
      } else {
        console.debug(error.name + ': ' + error.message)
      }
      throw error
    })
  }

  json2url(json: any) {
    let arr: string[] = []
    let str = ''
    for (let i in json) {
      str = i + '=' + json[i]
      arr.push(str)
    }
    return arr.join('&')
  }

  request(
    url: string,
    data: ObjectType = {},
    method: string = 'get',
    postHeaders: ObjectType = {}
  ): Promise<object> {

    for (let k in data) {
      if (url.indexOf(':' + k) !== -1) {
        url = url.replace(':' + k, data[k])
        delete data[k]
      }
    }

    method = method.toLowerCase()
    if (method === 'get') {
      let params = this.json2url(data)
      return this._instance
        .get(params && params.length > 0 ? url + '?' + params : url)
        .then(({ data }: ObjectType) => data)
    } else if (method === 'post') {
      return this._instance.post(url, data, postHeaders).then(({ data }: ObjectType) => data)
    } else if (method === 'put') {
      return this._instance.put(url, data, postHeaders).then(({ data }: ObjectType) => data)
    }
    return Promise.reject('has not been implement the method')
  }

  get(uri: string, params?: ObjectType): Promise<object> {
    return this.request(uri, params)
  }

  post(uri: string, params: ObjectType, headers?: ObjectType): Promise<object> {
    return this.request(uri, params, 'post', headers)
  }

  async isConnected(statusPage: string = '/') {
    return this.request(statusPage)
      .then(() => {
        // return utils.hasProperties(data, 'blockID', 'block_header')
        return true
      })
      .catch(() => false)
  }
}
