import AschWeb from '../src/asch-web'
import AschAPI from '../src/asch-api'
import { Network } from '../src/providers'
import { Provider, HTTPProvider } from '../src/providers'

describe('asch-api unit test', () => {
  const host = 'http://123.206.19.30:4096' //'http://mainnet.asch.cn/'
  const provider: Provider = new HTTPProvider(host, Network.Main)
  let secret = 'reunion march reduce artist horror correct wonder ice inside fringe zoo beyond'
  let secondSecret = '' //'11111111a'
  let aschWeb = new AschWeb(provider, secret, secondSecret)
  let address = 'AdbL9HkeL5CPHmuVn8jMJSHtdeTHL6QXb'
  let to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'
  let dappId = '25be71c296430a409cfeaf1ffaa957d18793f3695db07a846c22a7c467c45994'
  let publicKey: string = AschWeb.Utils.getKeys(secret).publicKey
  console.log('publicKey:'+publicKey)
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

  // it('asch-api open method test', () => {
  //   aschWeb.api
  //     .open(secret)
  //     .then(res => {
  //       console.log('open response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })


  // it('asch-api open2 method test', () => {
  //   aschWeb.api
  //     .open2(publicKey)
  //     .then(res => {
  //       console.log('open2 response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api getAccountDetail method test', () => {
  //   aschWeb.api
  //     .getAccountDetail(address)
  //     .then(res => {
  //       console.log('getAccountDetail response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api queryBalances method test', () => {
  //   aschWeb.api
  //     .queryBalances(address)
  //     .then(res => {
  //       console.log('queryBalances response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api queryVotedDelegates method test', () => {
  //   aschWeb.api
  //     .queryVotedDelegates(address)
  //     .then(res => {
  //       console.log('queryVotedDelegates response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api generateAccount method test', () => {
  //   aschWeb.api
  //     .generateAccount()
  //     .then(res => {
  //       console.log('generateAccount response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api getAccountCount method test', () => {
  //   aschWeb.api
  //     .getAccountCount()
  //     .then(res => {
  //       console.log('getAccountCount response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api queryTransactions method test', () => {
  //   aschWeb.api
  //     .queryTransactions()
  //     .then(res => {
  //     console.log('queryTransactions response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api getTransactionDetail method test', () => {
  //   aschWeb.api
  //     .getTransactionDetail('e9f457aa6e6c021bb31dd0899aa942c35b89b648de7e11c7c1a1573ee3750a1f')
  //     .then(res => {
  //     console.log('getTransactionDetail response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api getUnconfirmedTransactionDetail method test', () => {
  //   aschWeb.api
  //     .getUnconfirmedTransactionDetail('e9f457aa6e6c021bb31dd0899aa942c35b89b648de7e11c7c1a1573ee3750a1f')
  //     .then(res => {
  //     console.log('getUnconfirmedTransactionDetail response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api queryUnconfirmedTransactions method test', () => {
  //   aschWeb.api
  //     .queryUnconfirmedTransactions()
  //     .then(res => {
  //     console.log('queryUnconfirmedTransactions response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api queryTransfers method test', () => {
  //   aschWeb.api
  //     .queryTransfers()
  //     .then(res => {
  //     console.log('queryTransfers response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api getBlockDetailById method test', () => {
  //   aschWeb.api
  //     .getBlockDetailById('ab5e3de0f8bf552ec3a638eac9c81a957fb0c06dc0ed63871c3b0592f90ea806')
  //     .then(res => {
  //     console.log('getBlockDetailById response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api getBlockDetailByHeight method test', () => {
  //   aschWeb.api
  //     .getBlockDetailByHeight(72118)
  //     .then(res => {
  //     console.log('getBlockDetailByHeight response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })


  // it('asch-api getBlockDetailByHash method test', () => {
  //   aschWeb.api
  //     .getBlockDetailByHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  //     .then(res => {
  //     console.log('getBlockDetailByHash response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api queryBlocks method test', () => {
  //   aschWeb.api
  //     .queryBlocks()
  //     .then(res => {
  //     console.log('queryBlocks response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  // it('asch-api getBlockDetailByIdOrHeight method test', () => {
  //   aschWeb.api
  //     .getBlockDetailByIdOrHeight('1')
  //     .then(res => {
  //     console.log('getBlockDetailByIdOrHeight response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

  it('asch-api getBlocksHeight method test', () => {
    aschWeb.api
      .getBlocksHeight()
      .then(res => {
      console.log('getBlocksHeight response:' + JSON.stringify(res))
      })
      .catch(err => {
        console.error(err)
      })
    //.catch(err => console.error(err));
  })

  // it('asch-api transferXAS method test', () => {
  //   aschWeb.api
  //     .transferXAS(1000000, to, 'test')
  //     .then(res => {
  //       console.log('transferXAS response:' + JSON.stringify(res))
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   //.catch(err => console.error(err));
  // })

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
