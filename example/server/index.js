
// import { Utils, Keys, AschWeb, Provider, HTTPProvider, Network, Transaction } from '../../dist/bundle'
var AschWeb = require('../../dist/asch-web.async-node.min')
var Utils = AschWeb.Utils
var Keys = AschWeb.keys
var AW = AschWeb.AschWeb
var Provider = AschWeb.Provider
var HTTPProvider = AschWeb.HTTPProvider
var Network = AschWeb.Network
var Transaction = AschWeb.Transaction

const host = 'http://testnet.asch.io'// 'http://mainnet.asch.cn/'
const net = Network.Test//   Network.Main

let secret = 'quantum jelly guilt chase march lazy able repeat enrich fold sweet sketch'
let secondSecret = '' //'11111111a'

let address = 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2'
let to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'
let dappId = '25be71c296430a409cfeaf1ffaa957d18793f3695db07a846c22a7c467c45994'
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

//utils用法
let keys = Utils.getKeys(secret)
console.log('keys:' + JSON.stringify(keys))

let addr = Utils.getAddressByPublicKey(keys.publicKey)
console.log('get address by publicKey:' + addr)


let signedTrx = Utils.fullSign(unsignedTrx, secret, secondSecret)
console.log('full sign transaction:' + JSON.stringify(signedTrx))


const provider = new HTTPProvider(host, net)
let aschWeb = new AW(provider, secret, secondSecret)


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
const provider2 = new HTTPProvider(host, net)
//切换provider
aschWeb.setProvider(provider2)

aschWeb.api
    .get('api/v2/blocks', {})
    .then(res => {
        console.log('get blocks response:' + JSON.stringify(res))
    })
    .catch(err => {
        console.error(err)
    })
