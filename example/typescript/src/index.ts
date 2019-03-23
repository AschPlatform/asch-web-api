import { AschWeb } from '../../../dist/tsc'
//import {AschWeb, Keys, Transaction, Utils ,Network , Provider, HTTPProvider} from 'asch-web'
// import {AschWeb, Keys, Transaction, Utils ,Network , Provider, HTTPProvider} from '../../../dist/tsc'
const host = 'http://testnet.asch.cn'// 'http://mainnet.asch.cn/'
// console.log('AschWeb.Network:'+AschWeb.Network)
const net = AschWeb.Network.Test//   Network.Main

let secret = 'quantum jelly guilt chase march lazy able repeat enrich fold sweet sketch'
let secondSecret = '' //'11111111a'
let address = 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2'
let to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'

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
let keys = AschWeb.Utils.getKeys(secret)
console.log('keys:' + JSON.stringify(keys))

let addr: string = AschWeb.Utils.getAddress(keys.publicKey)
console.log('get address by publicKey:' + addr)


let signedTrx = AschWeb.Utils.fullSign(unsignedTrx, secret, secondSecret)
console.log('full sign transaction:' + JSON.stringify(signedTrx))

const provider = new AschWeb.HTTPProvider(host, net)
const aschWeb = new AschWeb(provider, secret, secondSecret)

aschWeb.api
    .transferXAS(1000000, to, 'test')
    .then(res => {
        console.log('transfer XAS response:' + JSON.stringify(res))
    })
    .catch(err => {
        console.error(err)
    })

const host2 = 'http://mainnet.asch.cn/'
const net2 = AschWeb.Network.Main
const provider2 = new AschWeb.HTTPProvider(host2, net2)
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

