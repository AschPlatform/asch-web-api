import AschWeb from '../src/asch-web'

describe('asch-web unit test', () => {
  const host = 'http://mainnet.asch.cn/'
  let secret = 'quantum jelly guilt chase march lazy able repeat enrich fold sweet sketch'
  let secondSecret = '' //'11111111a'
  let aschWeb = new AschWeb(host, secret, secondSecret)
  let address = 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2'
  let to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'
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
      .transferXAS(1000000, to, 'test')
      .then(res => {
        console.log('transferXAS response:' + JSON.stringify(res))
      })
      .catch(err => {
        console.error(err)
      })
    //.catch(err => console.error(err));
  })
})
