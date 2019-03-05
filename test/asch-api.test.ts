import AschWeb from '../src/asch-web'
import AschAPI from '../src/asch-api'
import { Network } from '../src/type'
import { Provider, HTTPProvider } from '../src/providers'

describe('asch-api unit test', () => {
  const host = 'http://mainnet.asch.cn/'
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

  it('asch-api transferXAS method test', () => {
    aschWeb.api
      .transferXAS(1000000, to, 'test')
      .then(res => {
        console.log('transferXAS response:' + JSON.stringify(res))
      })
      .catch(err => {
        console.error(err)
      })
    //.catch(err => console.error(err));
  })

  // it('asch-api setName method test', () => {
  //   aschWeb.api
  //     .setName('test')
  //     .then(res => {
  //       console.log('setName response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // // it('asch-api setSecondPassword method test', () => {
  // //   aschWeb.api
  // //     .setSecondPassword('test')
  // //     .then(res => {
  // //       console.log('setSecondPassword response:' + JSON.stringify(res))
  // //     })
  // //     .catch(err => {
  // //       console.error(err)
  // //     })
  // //   //.catch(err => console.error(err));
  // // })

  // // it('asch-api setLock method test', () => {
  // //   aschWeb.api
  // //     .setLock(7502984,10000000)
  // //     .then(res => {
  // //       console.log('setLock response:' + JSON.stringify(res))
  // //     })
  // //     .catch(err => {
  // //       console.error(err)
  // //     })
  // //   //.catch(err => console.error(err));
  // // })

  // // it('asch-api unlock method test', () => {
  // //   aschWeb.api
  // //     .unlock()
  // //     .then(res => {
  // //       console.log('unlock response:' + JSON.stringify(res))
  // //     })
  // //     .catch(err => {
  // //       console.error(err)
  // //     })
  // //   //.catch(err => console.error(err));
  // // })

  // it('asch-api setMultiAccount method test', () => {
  //   aschWeb.api
  //     .setMultiAccount()
  //     .then(res => {
  //       console.log('setMultiAccount response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api registerAgent method test', () => {
  //   aschWeb.api
  //     .registerAgent()
  //     .then(res => {
  //       console.log('registerAgent response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api setAgent method test', () => {
  //   aschWeb.api
  //     .setAgent(address)
  //     .then(res => {
  //       console.log('setAgent response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api repealAgent method test', () => {
  //   aschWeb.api
  //     .repealAgent()
  //     .then(res => {
  //       console.log('repealAgent response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api registerDelegate method test', () => {
  //   aschWeb.api
  //     .registerDelegate()
  //     .then(res => {
  //       console.log('registerDelegate response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api voteDelegate method test', () => {
  //   aschWeb.api
  //     .voteDelegate([address])
  //     .then(res => {
  //       console.log('voteDelegate response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api cleanVote method test', () => {
  //   aschWeb.api
  //     .cleanVote([address])
  //     .then(res => {
  //       console.log('cleanVote response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api registerIssuer method test', () => {
  //   aschWeb.api
  //     .registerIssuer('kimziv','register issuer test')
  //     .then(res => {
  //       console.log('registerIssuer response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api registerAsset method test', () => {
  //   aschWeb.api
  //     .registerAsset('KIM', 'kim token test', 100000000,6)
  //     .then(res => {
  //       console.log('registerAsset response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api issueAsset method test', () => {
  //   aschWeb.api
  //     .issueAsset('KIM.kimziv', 123)
  //     .then(res => {
  //       console.log('issueAsset response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api transferAsset method test', () => {
  //   aschWeb.api
  //     .transferAsset('KIM.kimziv', 123456, to, 'test')
  //     .then(res => {
  //       console.log('transferAsset response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api registerDapp method test', () => {

  //   aschWeb.api
  //     .registerDapp('asch-dapp-cctime',
  //     'Decentralized news channel',
  //     'asch,dapp,demo,cctime',
  //     'https://github.com/AschPlatform/asch-dapp-cctime/archive/master.zip',
  //     'http://o7dyh3w0x.bkt.clouddn.com/hello.png',
  //     'news',
  //     [ '8b1c24a0b9ba9b9ccf5e35d0c848d582a2a22cca54d42de8ac7b2412e7dc63d4',
  //       'aa7dcc3afd151a549e826753b0547c90e61b022adb26938177904a73fc4fee36',
  //     'e29c75979ac834b871ce58dc52a6f604f8f565dea2b8925705883b8c001fe8ce',
  //     '55ad778a8ff0ce4c25cb7a45735c9e55cf1daca110cfddee30e789cb07c8c9f3',
  //     '982076258caab20f06feddc94b95ace89a2862f36fea73fa007916ab97e5946a' ],
  //     3
  //     )
  //     .then(res => {
  //       console.log('registerDapp response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api updateBooker method test', () => {
  //   aschWeb.api
  //     .updateBooker(dappId, address, to)
  //     .then(res => {
  //       console.log('updateBooker response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api addBooker method test', () => {
  //   aschWeb.api
  //     .addBooker(dappId, address, secret)
  //     .then(res => {
  //       console.log('addBooker response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api deleteBooker method test', () => {
  //   aschWeb.api
  //     .deleteBooker(dappId, secret)
  //     .then(res => {
  //       console.log('deleteBooker response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api depositDapp method test', () => {
  //   aschWeb.api
  //     .depositDapp(dappId,'KIM.kimziv', 12345)
  //     .then(res => {
  //       console.log('depositDapp response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api withdrawDapp method test', () => {
  //   aschWeb.api
  //     .withdrawDapp(dappId, to, 12345,'111', 'aaaaaa')
  //     .then(res => {
  //       console.log('withdrawDapp response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api createProposal method test', () => {
  //   aschWeb.api
  //     .createProposal('proposalA', 'create a test proposal', 'contract','proposal content:xxxxxx',123)
  //     .then(res => {
  //       console.log('createProposal response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api voteProposal method test', () => {
  //   aschWeb.api
  //     .voteProposal('1')
  //     .then(res => {
  //       console.log('voteProposal response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api activateProposal method test', () => {
  //   aschWeb.api
  //     .activateProposal('1')
  //     .then(res => {
  //       console.log('activateProposal response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api registerGateway method test', () => {
  //   aschWeb.api
  //     .registerGateway('kimgw', publicKey, 'test gateway')
  //     .then(res => {
  //       console.log('transferXAS response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api openGatewayAccount method test', () => {
  //   aschWeb.api
  //     .openGatewayAccount('kimgw')
  //     .then(res => {
  //       console.log('openGatewayAccount response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api depositGateway method test', () => {
  //   aschWeb.api
  //     .depositGateway(address, 'BTC.KIM',10000 )
  //     .then(res => {
  //       console.log('depositGateway response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api withdrawGateway method test', () => {
  //   aschWeb.api
  //     .withdrawGateway(address, 'btc', 'test',1000,100000)
  //     .then(res => {
  //       console.log('withdrawGateway response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })
})
