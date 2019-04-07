import AschWeb from '../../src/asch-web'
import AschAPI from '../../src/asch-api'
import { Network } from '../../src/providers'
import { Provider, HTTPProvider } from '../../src/providers'
import { ContractMetadataMananger } from '../../src/contract/metadata'

describe('meatadata test', () => {
  const host = 'http://testnet.asch.io/'
  const provider: Provider = new HTTPProvider(host, Network.Main)
  let secret = 'quantum jelly guilt chase march lazy able repeat enrich fold sweet sketch'
  let secondSecret = '' //'11111111a'
  let aschWeb = new AschWeb(provider, secret, secondSecret)
  let address = 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2'
  let to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'
  let dappId = '25be71c296430a409cfeaf1ffaa957d18793f3695db07a846c22a7c467c45994'
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

  it('meatadata fromJSONObject method test', () => {
    // aschWeb.api
    //   .transferXAS(1000000, to, 'test')
    //   .then(res => {
    //     console.log('transferXAS response:' + JSON.stringify(res))
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    //.catch(err => console.error(err));
    // let contract = await aschWeb.createContractFromName(contractName)
    // ContractMetadataMananger.fromJSONObject()
  })

})
