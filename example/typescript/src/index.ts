import {
    AschWeb, ContractMetadataMananger,
    ContractMetadataObject,
    MethodMetadata,
    ParameterMetadata,
    PropertyMetadata,
    CustomeStateType,
    StateMetadata,
    TypeInfo,
    TypeKind
} from '../../../dist/tsc'
import { CrowdFundgingContract } from './demo_contract'
import assert from 'assert'
import fs from 'fs'

import { AschContract } from '../../../dist/tsc/asch-contract';
// import { AschWeb,AschContract} from '../../../src'
// import { ContractMetadataMananger ,ContractMetadataObject} from '../../../src/contract/metadata'
const host = 'http://123.206.19.30:4096'// 'http://testnet.asch.io'// 'http://mainnet.asch.cn/'
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

function extractParamType(param: ParameterMetadata): string {
    switch (param.type.kind) {
        case TypeKind.unknow:
            {
                return 'any'
            }
        case TypeKind.primitive:
            {
                return param.type.name === 'bigint' ? 'string' : param.type.name
            }
        case TypeKind.stateCollection:
            {
                return 'any'
            }
        case TypeKind.customeState:
            {
                return 'any'
            }
        case TypeKind.array:
            {
                return 'any'
            }
        case TypeKind.interface:
            {
                return 'any'
            }
    }
    return 'any'
}
async function testContractGen() {
    let defaultGasLimit = 10000000
    let contract: any = await aschWeb.createContractFromName('test2_kim')
    // console.log('contract:'+JSON.stringify(contract))
    let metadata: ContractMetadataObject = contract.metadata
    //console.log('metadata:'+JSON.stringify(metadata))
    let manager: ContractMetadataMananger = ContractMetadataMananger.fromJSONObject(contract.metadata)
    let customeTypes: CustomeStateType[] = metadata.customeTypes
    let importCode = "import {AschWeb} from 'asch-web'\nconst AschContract = AschWeb.AschContract"
    let sourceCode = `${importCode}\n\nexport class ${metadata.className} extends  AschContract {\n\n`
    customeTypes.forEach(customeType => {
        console.log('customeType:' + JSON.stringify(customeType.name))
        let properties: PropertyMetadata[] = customeType.properties
        properties.forEach(property => {
            console.log('property:' + JSON.stringify(property.name))
            console.log('TypeInfo:' + property.type.name)
        });
    });
    let methods: MethodMetadata[] = manager.methods

    methods.forEach(method => {
        let methodCode: string = ' '
        if (method.public && !method.constant && method.payable && !method.isConstructor) {
            methodCode += 'function ' + method.name + '('
            console.log('method:' + JSON.stringify(method.name))
            console.log('public:' + JSON.stringify(method.public))
            let params: ParameterMetadata[] = method.parameters
            assert(params.length == 2)
            params.forEach(param => {
                console.log('params:' + JSON.stringify(param))
                if (params[0] == param) {
                    // methodCode+=param.name+": "+extractParamType(param)
                    methodCode += param.name
                } else {
                    // methodCode+=', '+param.name+": "+extractParamType(param)
                    methodCode += ', ' + param.name
                }
            });
            // let amount=params[0].name
            console.log('returnType:' + JSON.stringify(method.returnType))
            let returnType: TypeInfo | undefined = method.returnType
            // let returnCode = returnType?(returnType.name):'void'
            let returnCode = 'Promise<object>'
            // methodCode+=`): ${returnCode}\n`
            methodCode += `)\n`
            methodCode += ' {\n'
            methodCode += `    return this.pay(${params[1].name}, ${params[0].name}, '${method.name}', ${defaultGasLimit}, true)`
            methodCode += '\n }\n\n'
            sourceCode += methodCode
            console.log(methodCode)
            console.log('\n')
        } else if (method.public && !method.constant && !method.payable && !method.isConstructor) {
            methodCode += 'public ' + method.name + '('
            console.log('method:' + JSON.stringify(method.name))
            console.log('public:' + JSON.stringify(method.public))
            let params: ParameterMetadata[] = method.parameters
            // assert(params.length==2)
            let argsCode: string = '['
            params.forEach(param => {
                console.log('params:' + JSON.stringify(param))
                if (params[0] == param) {
                    methodCode += param.name + ": " + extractParamType(param)
                    argsCode += param.name
                } else {
                    methodCode += ', ' + param.name + ": " + extractParamType(param)
                    argsCode += ', ' + param.name
                }
            });
            // let amount=params[0].name
            console.log('returnType:' + JSON.stringify(method.returnType))
            argsCode += ']'
            let returnType: TypeInfo | undefined = method.returnType
            // let returnCode = returnType?(returnType.name):'void'
            let returnCode = 'Promise<object>'
            methodCode += `): ${returnCode}\n`
            methodCode += ' {\n'
            methodCode += `    return this.call('${method.name}', ${argsCode}, ${defaultGasLimit}, true)`
            methodCode += '\n }\n\n'
            sourceCode += methodCode
            console.log(methodCode)
            console.log('\n')
        } else if (method.public && method.constant) {
            methodCode += 'public ' + method.name + '('
            console.log('method:' + JSON.stringify(method.name))
            console.log('public:' + JSON.stringify(method.public))
            let params: ParameterMetadata[] = method.parameters
            let argsCode: string = '['
            params.forEach(param => {
                console.log('params:' + JSON.stringify(param))
                if (params[0] == param) {
                    methodCode += param.name + ": " + extractParamType(param)
                    argsCode += param.name
                } else {
                    methodCode += ', ' + param.name + ": " + extractParamType(param)
                    argsCode += ', ' + param.name
                }
            });
            // let amount=params[0].name
            console.log('returnType:' + JSON.stringify(method.returnType))
            argsCode += ']'
            let returnType: TypeInfo | undefined = method.returnType
            // let returnCode = returnType?(returnType.name):'void'
            let returnCode = 'Promise<object>'
            methodCode += `): ${returnCode}\n`
            methodCode += ' {\n'
            methodCode += `    return this.constans('${method.name}', ${argsCode})`
            methodCode += '\n }\n\n'
            sourceCode += methodCode
            console.log(methodCode)
            console.log('\n')
        }
    });
    let states: StateMetadata[] = manager.states
    states.forEach(state => {
        let methodCode: string = ' '
        if (state.public && state.type.kind == 0) {
            console.log('state:' + JSON.stringify(state))
            methodCode += 'public get_' + state.name + '('
            let returnCode = 'Promise<object>'
            methodCode += `): ${returnCode}\n`
            methodCode += ' {\n'
            methodCode += `    return this.queryStates('${state.name}')`
            methodCode += '\n }\n\n'
            sourceCode += methodCode
            console.log(methodCode)
            console.log('\n')
        }
    });
    sourceCode += '\n}'
    console.log(sourceCode)
    return null
}

/**
 * 发布智能合约
 */
async function registerContract() {
    let code = fs.readFileSync('/Users/kimziv/Documents/kzworks1/asch-web/example/typescript/src/crowdFundging_v2.tsa', 'utf8')
    //console.log(code)
    let result = await aschWeb.registerContract('crowdFundging_v2', 'a crowd funding contract', code)
    console.log('registerContract result:' + JSON.stringify(result))
    return null
}

// registerContract()

async function testApi() {
    // let result = await aschWeb.api.getAccountDetail('AdbL9HkeL5CPHmuVn8jMJSHtdeTHL6QXb')
    // console.log('result:' + JSON.stringify(result))
    let result = await aschWeb.api.transferXAS(123456,to,'test transfer XAS')
    console.log('result:' + JSON.stringify(result))
    return null
}

async function testContract() {
    let defaultGasLimit = 1000000


    let contract: any = await aschWeb.createContractFromName('test2_kim')
    // console.log('contract:'+JSON.stringify(contract))
    // let metadata:ContractMetadataObject=contract.metadata
    let contractJson = contract.contractJson

    // console.log('contractjson:'+JSON.stringify(contractJson))
    let demoContract: CrowdFundgingContract = new CrowdFundgingContract(contractJson, aschWeb.api)
    // let result =await demoContract.getFunding('AdbL9HkeL5CPHmuVn8jMJSHtdeTHL6QXb')
    // console.log('result:'+JSON.stringify(result))
    // let result =await demoContract.getXXT('576')
    // console.log('result:'+JSON.stringify(result))
    // let result =await demoContract.getFunding(address)
    // console.log('result:'+JSON.stringify(result))
    // let result =await demoContract.payInitialToken('10001234567','kim.KIM')
    // console.log('result:'+JSON.stringify(result))
    return null
}

async function testAddFunction() {
    let defaultGasLimit = 1000000
    let ret = await aschWeb.createContractFromName('crowdFundging_v1')
    if (ret instanceof AschContract) {
        let contract: AschContract = ret
        contract.gasLimit = 1000000
        contract.enablePayGasInXAS = true
        // let result = await contract.getXXT('233')
        // console.log('result:' + JSON.stringify(result))
        // let result =await contract.crowdFunding('XAS','8345667')
        // console.log('result:'+JSON.stringify(result))
        // let result =await contract.payInitialToken('kim.KIM','8345667')
        // console.log('result:'+JSON.stringify(result))
        // let result =await contract.getFunding('AdbL9HkeL5CPHmuVn8jMJSHtdeTHL6QXb')
        // console.log('result:'+JSON.stringify(result))
        // let result =await contract.getTotalFundingToken()
        // console.log('result:'+JSON.stringify(result))
        // // 调用默认的默认向合约转账方法,方法名参数可以省略,此实例合约中对应crowdFunding函数(@payable({ isDefault: true }))
        //   result =await contract.crowdFunding('XAS','8345667')
        // console.log('result:'+JSON.stringify(result))
        // //调用payInitialToken资产接收方法(@payable)
        // let  result =await contract.payInitialToken('kim.KIM','8345667')
        // console.log('result:'+JSON.stringify(result))
        // contract.addPayableMethod('payInitialToken')
        // let result =await contract.payInitialToken('kim.KIM','5000000000000')
        // console.log('result:'+JSON.stringify(result))
        //contract.addPayableMethod('crowdFunding')
        // let result =await contract.crowdFunding('XAS','12345667')
        // console.log('result:'+JSON.stringify(result))
        // let result =await contract.getFunding(address)
        // console.log('result:'+JSON.stringify(result))
        // let result =await contract.pay('XAS','8345667')
        // console.log('result:'+JSON.stringify(result))
        // let result =await contract.pay('kim.KIM','8345667', 'payInitialToken')
        // console.log('result:'+JSON.stringify(result))
        // let contractJson=contract.contractJson
        // let demoContract: CrowdFundgingContract = new CrowdFundgingContract(contractJson, aschWeb.api)
        // let result =await contract.getTotalFundingToken()
        // console.log('result:'+JSON.stringify(result))

        let result =await contract.getResultOfContract('e7f9d71cbb92fa8ff545a8353f10813da90b20303bb1c97bb4e373b4eb0e66d6')
        console.log('result:'+JSON.stringify(result))

        // let result =await demoContract.payInitialToken('10001234567','kim.KIM')
        // console.log('result:'+JSON.stringify(result))

        // //状态查询函数查询
        // let result =await contract.constant('getFunding','AdbL9HkeL5CPHmuVn8jMJSHtdeTHL6QXb')
        // console.log('result:'+JSON.stringify(result))
        // //简单状态查询
        // result =await contract.queryStates('totalFundingToken')
        // console.log('result:'+JSON.stringify(result))
    }


    return null
}
// testApi()
// testContractGen()
//testContract()
testAddFunction()
//    var name = "foo";
// Implement it
// var func = new Function("return function " + name + "(){ console.log('hi there!'); };")();
// var code =`return function payInitialToken(amount, currency) { return this.pay(currency, amount, 'payInitialToken', 10000000, true)}`
// var func = new Function(code)();
// // Test it
// func();
// // Next is TRUE
// func.name === 'foo'