import { AschWeb,ContractMetadataMananger ,
    ContractMetadataObject,
    MethodMetadata ,
    ParameterMetadata,
    PropertyMetadata,
    CustomeStateType,
    TypeInfo
} from '../../../dist/tsc'
// import { AschWeb,AschContract} from '../../../src'
// import { ContractMetadataMananger ,ContractMetadataObject} from '../../../src/contract/metadata'
const host ='http://123.206.19.30:4096'// 'http://testnet.asch.io'// 'http://mainnet.asch.cn/'
const net = AschWeb.Network.Test//   Network.Main
const TransactionBuilder = AschWeb.TransactionBuilder

let secret = 'reunion march reduce artist horror correct wonder ice inside fringe zoo beyond'
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


// //utils用法
// let keys = AschWeb.Utils.getKeys(secret)
// console.log('keys:' + JSON.stringify(keys))

// let addr: string = AschWeb.Utils.getAddress(keys.publicKey)
// console.log('get address by publicKey:' + addr)


// let signedTrx = AschWeb.Utils.fullSign(unsignedTrx, secret, secondSecret)
// console.log('full sign transaction:' + JSON.stringify(signedTrx))

const provider = new AschWeb.HTTPProvider(host, net)
const aschWeb = new AschWeb(provider, secret, secondSecret)

// aschWeb.api
//     .transferXAS(1000000, to, 'test')
//     .then(res => {
//         console.log('transfer XAS response:' + JSON.stringify(res))
//     })
//     .catch(err => {
//         console.error(err)
//     })

// // const host2 = 'http://mainnet.asch.cn/'
// // const net2 = AschWeb.Network.Main
// // const provider2 = new AschWeb.HTTPProvider(host2, net2)
// // //切换provider
// // aschWeb.setProvider(provider2)

// aschWeb.api
//     .get('api/v2/blocks', {})
//     .then(res => {
//         console.log('get blocks response:' + JSON.stringify(res))
//     })
//     .catch(err => {
//         console.error(err)
//     })


// let trans = TransactionBuilder.transferXAS(1, to, 'test')
// console.log('trans:' + JSON.stringify(trans))
// let signedTrans = AschWeb.Utils.fullSign(trans, secret, secondSecret)
// console.log('signedTrans:' + JSON.stringify(signedTrans))
// let result = aschWeb.api.broadcastTransaction(signedTrans)
//     .then(res => {
//         console.log('result:' + JSON.stringify(res))
//     })
//     .catch(err => {
//         console.error(err)
//     })

 

 
    // aschWeb.api
    //   .transferXAS(1000000, to, 'test')
    //   .then(res => {
    //     console.log('transferXAS response:' + JSON.stringify(res))
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    //.catch(err => console.error(err));
    async function testContractGen(){
        let contract: any= await aschWeb.createContractFromName('test-contract')
        // console.log('contract:'+JSON.stringify(contract))
        let metadata:ContractMetadataObject=contract.metadata
        //console.log('metadata:'+JSON.stringify(metadata))
        let manager: ContractMetadataMananger= ContractMetadataMananger.fromJSONObject(contract.metadata)
        let customeTypes: CustomeStateType[] = metadata.customeTypes
        //let sourceCode=""
        customeTypes.forEach(customeType => {
            console.log('customeType:'+JSON.stringify(customeType.name))
            let properties:PropertyMetadata[] = customeType.properties
            properties.forEach(property => {
                console.log('property:'+JSON.stringify(property.name))
                console.log('TypeInfo:'+property.type.name)
            });
        });
        let methods: MethodMetadata[] = manager.methods
        
        methods.forEach(method => {
            let methodCode:string=''
            if(method.public){
                methodCode+='public '+method.name+'('
                console.log('method:'+JSON.stringify(method.name))
                console.log('public:'+JSON.stringify(method.public))
                let params:ParameterMetadata[] = method.parameters
                params.forEach(param => {
                    console.log('params:'+JSON.stringify(param))
                    if(params[0]==param){
                        methodCode+=param.name+": "+param.type.text
                    }else{
                        methodCode+=', '+param.name+": "+param.type.text
                    }
                });
                console.log('returnType:'+JSON.stringify(method.returnType))
                let returnType:TypeInfo|undefined=method.returnType
                let returnCode = returnType?(returnType.name):'void'
                methodCode+=`): ${returnCode}\n`
                methodCode+='{\n'

                methodCode+='}\n'
                console.log(methodCode)
                console.log('\n')
            }
        });
        return null
    }

    testContractGen()
