import axios from 'axios'
import { ObjectType } from '../utils/utils'
import { Provider } from './Provider'
export class HTTPProvider implements Provider {
  _url: string
  _timeout: number
  _headers: any
  _instance: any
  constructor(url: string, timeout: number = 30000, headers = {}) {
    url = url.replace(/\/+$/, '')

    this._url = url
    this._timeout = timeout
    this._headers = headers

    this._instance = axios.create({
      baseURL: url,
      timeout: timeout,
      headers: headers
    })
  }

  json2url(json: any) {
    let arr = []
    let str = ''
    for (let i in json) {
      str = i + '=' + json[i]
      arr.push(str)
    }
    return arr.join('&')
  }

  request(url: string, data: ObjectType = {}, method = 'get', postHeaders: ObjectType = {}) {
    for (let k in data) {
      if (url.indexOf(':' + k) !== -1) {
        url = url.replace(':' + k, data[k])
        delete data[k]
      }
    }
    console.info('path:' + url)
    method = method.toLowerCase()
    // var res;
    if (method === 'get') {
      return this._instance
        .get(url + '?' + this.json2url(data))
        .then(({ data }: ObjectType) => data)
    } else if (method === 'post') {
      return this._instance.post(url, data, postHeaders).then(({ data }: ObjectType) => data)
    } else if (method === 'put') {
      return this._instance.put(url, data, postHeaders).then(({ data }: ObjectType) => data)
    }
  }

  get(uri: string, params: ObjectType) {
    return this.request(uri, params)
  }

  async isConnected(statusPage = '/') {
    return this.request(statusPage)
      .then(() => {
        // return utils.hasProperties(data, 'blockID', 'block_header')
        return true
      })
      .catch(() => false)
  }
}
