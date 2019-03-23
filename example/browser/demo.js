const AschWeb = window.AschWeb
const Utils = AschWeb.Utils
const Keys = AschWeb.keys
const Provider = AschWeb.Provider
const HTTPProvider = AschWeb.HTTPProvider
const Network = AschWeb.Network
const Transaction = AschWeb.Transaction

const host = 'http://testnet.asch.io'// 'http://mainnet.asch.cn/'
const net = Network.Test//   Network.Main

const secret = 'reunion march reduce artist horror correct wonder ice inside fringe zoo beyond'
const secondSecret = '' //'11111111a'

const address = 'AdbL9HkeL5CPHmuVn8jMJSHtdeTHL6QXb'
const to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'
const dappId = '25be71c296430a409cfeaf1ffaa957d18793f3695db07a846c22a7c467c45994'
const contractName = 'crowdFundging_v1'
let publicKey
let unsignedTrx =
{
    type: 1,
    fee: 10000000,
    args: [1000000, 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'],
    timestamp: 84190767,
    message: '',
    senderPublicKey: '',
    senderId: 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2',
}

const app = async () => {


    //utils用法
let keys = Utils.getKeys(secret)
console.log('keys:' + JSON.stringify(keys))

let addr = Utils.getAddress(keys.publicKey)
console.log('get address by publicKey:' + addr)


let signedTrx = Utils.fullSign(unsignedTrx, secret, secondSecret)
console.log('full sign transaction:' + JSON.stringify(signedTrx))


const provider = new HTTPProvider(host, net)
let aschWeb = new AschWeb(provider, secret, secondSecret)


aschWeb.api
    .transferXAS(1000000, to, 'test')
    .then(res => {
        console.log('transfer XAS response:' + JSON.stringify(res))
    })
    .catch(err => {
        console.error(err)
    })

const host2 = 'http://mainnet.asch.cn/'
const net2 = Network.Main
const provider2 = new HTTPProvider(host2, net2)
//切换provider
aschWeb.setProvider(provider2)

aschWeb.api
    .get('api/blocks/getStatus', {})
    .then(res => {
        console.log('get blocks response:' + JSON.stringify(res))
    })
    .catch(err => {
        console.error(err)
    })
};

 async function testContract(){
    const provider = new HTTPProvider(host, net)
    let aschWeb = new AW(provider, secret, secondSecret)
    let contract = await aschWeb.createContractFromName(contractName)
    //console.log('testContract meta data:'+JSON.stringify(contract))
    let result = await contract.call('getXXT', ['233'],1000000,false)
    console.log('testContract result:'+JSON.stringify(result))
}

app();