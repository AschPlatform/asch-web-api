import AschWeb from '../src/asch-web'
import { Provider, HTTPProvider } from '../src/providers'
/**
 * Dummy test
 */
describe('Utils test', () => {
  const host = 'http://testnet.asch.io/'
  const provider: Provider = new HTTPProvider(host)
  let secret = 'marine tell onion breeze cheap sentence umbrella hurt humble tackle parent fantasy'
  let aschWeb = new AschWeb(provider, secret)
  let address = 'A2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB'
  let publicKey: string
  let utils = AschWeb.Utils
  let trx = {
    type: 601,
    fee: 0,
    args: [1000000, false, 'A_Sample_Contract_T2', 'onPay', ['123']],
    senderId: 'A2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB',
    signatures: [],
    timestamp: 80568046,
    senderPublicKey: ''
  }
  const msgBytes='3647a7118101037f72ad4e9f00d1ec9ddd0b62eff222a7b6147f9059cab762b7'


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

  it('AschWeb utils fromHex method', async () => {
    let hex = utils.fromHex(msgBytes)
    console.log('fromHex:'+hex)
    expect(hex).not.toBeNull()
    // expect(hex).toStrictEqual('A2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB')
  })

  it('AschWeb utils getAddr methon', async () => {
   
    let address:string = utils.getAddress(publicKey)
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
    if(trans.signatures)
      expect(trans.signatures[0]).not.toBeNull()
  })

  it('AschWeb utils create account methon', async () => {
    let trans = utils.sign(trx, secret)
    if(trans.signatures)
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

  // it('AschWeb utils fullTimestamp methon', async () => {
  //   let timeStr = utils.fullTimestamp(82799313)
  //   expect(timeStr).toEqual(expect.stringContaining('2019'))
  // })
  it('AschWeb utils signBytes method', async () => {
    // let keys = utils.getKeys(secret)
    // console.log('privateKey:'+keys.privateKey)
    // let signature = utils.signBytes(msgBytes, keys.privateKey)
    let signature = utils.signBytes(msgBytes, secret)
    console.log('signBytes:'+signature)
    expect(signature).not.toBeNull()
  })

  it('AschWeb utils verifyBytes method', async () => {
    let keys = utils.getKeys(secret)
    console.log('privateKey:'+keys.publicKey)
    let ret= utils.verifyBytes(msgBytes,'440d21ae0206931e3be1dd7053b593a0ef240a0dfebf9e43b6a914a22ac4e07ff7205a718778824072c708193618eafaa5b89ccb73cc4782f75dab6c390ac805',keys.publicKey)
    console.log('verifyBytes:'+ret)
    expect(ret).toEqual(true)
  })
})
