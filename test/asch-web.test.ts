import AschWeb from '../src/asch-web'

describe('asch-web unit test', () => {
  const host = 'http://mainnet.asch.cn/'
  let secret = 'marine tell onion breeze cheap sentence umbrella hurt humble tackle parent fantasy'
  let secondSecret = '11111111a'
  let aschWeb = new AschWeb(host, secret, secondSecret)
  let address = 'A2xBm2AqE2kuye9SDUfgxbvaGZ9YyNwgtB'
  let to = 'AdbL9HkeL5CPHmuVn8jMJSHtdeTHL6QXb'
  let publicKey
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

  it('asch-web transferXAS method test', () => {
    aschWeb
      .transferXAS(10, to, 'test')
      .then(res => {
        console.log('transferXAS response:' + JSON.stringify(res))
      })
      .catch(err => {
        console.error(err)
      })
    //.catch(err => console.error(err));
  })
})
