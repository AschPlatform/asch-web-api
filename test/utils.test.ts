import AschWeb from '../src/asch-web'
import { Provider, HTTPProvider } from '../src/providers'
/**
 * Dummy test
 */
describe('Utils test', () => {
  const host = 'http://mainnet.asch.cn/'
  const provider: Provider = new HTTPProvider(host)
  let secret = 'marine tell onion breeze cheap sentence umbrella hurt humble tackle parent fantasy'
  let aschWeb = new AschWeb(provider, secret)
  let address = 'A2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB'
  let publicKey: string
  let utils = aschWeb.utils
  let trx = {
    type: 601,
    fee: 0,
    args: [1000000, false, 'A_Sample_Contract_T2', 'onPay', ['123']],
    senderId: 'A2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB',
    signatures: [],
    timestamp: 80568046,
    senderPublicKey: ''
  }

  it('AschWeb must have provider', () => {
    expect(aschWeb).toHaveProperty('provider')
  })

  it('AschWeb get block props', async () => {
    let api = aschWeb.api
    let res = await api.get('api/v2/blocks', {})
    console.log('response:' + JSON.stringify(res))
    expect(res).toHaveProperty('blocks')
  })

  it('AschWeb utils getkeys methon', async () => {
    let keys = utils.getKeys(secret)
    publicKey = keys.publicKey
    trx.senderPublicKey = publicKey
    expect(keys).toHaveProperty('publicKey')
    expect(publicKey).not.toBeNull()
    expect(keys).toHaveProperty('privateKey')
    expect(keys.privateKey).not.toBeNull()
  })

  it('AschWeb utils getAddr methon', async () => {
    let address = utils.getAddressByPublicKey(publicKey)
    expect(address).not.toBeNull()
    expect(address).toStrictEqual('A2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB')
  })

  it('AschWeb utils isAddress methon', async () => {
    let flag = utils.isAddress(address)
    let errFlag = utils.isAddress('B2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB')
    expect(flag).toEqual(true)
    expect(errFlag).toEqual(false)
  })

  it('AschWeb utils sign methon', async () => {
    let trans = utils.sign(trx, secret)
    expect(trans.signatures[0]).not.toBeNull()
  })

  it('AschWeb utils create account methon', async () => {
    let trans = utils.sign(trx, secret)
    expect(trans.signatures[0]).not.toBeNull()
  })

  it('AschWeb utils fromSatoshi methon', async () => {
    let num = utils.fromSatoshi(100000000, 8)
    expect(num).toEqual(1)
  })

  it('AschWeb utils toSatoshi methon', async () => {
    let num = utils.toSatoshi(1, 7)
    expect(num).toEqual(10000000)
  })

  it('AschWeb utils getTime methon', async () => {
    let times = utils.getTime(1549856913312)
    expect(times).toEqual(82799313)
  })

  it('AschWeb utils fullTimestamp methon', async () => {
    let timeStr = utils.fullTimestamp(82799313)
    expect(timeStr).toEqual(expect.stringContaining('2019'))
  })
})
