import * as Bip39 from 'bip39'

function checkSecret(secret: string): boolean{
    return Bip39.validateMnemonic(secret) && (secret!=null && secret.length>0)
}


function checkPublicKey(publicKey: string): boolean{
     return (publicKey!=null && publicKey.length>0)
}

function checkAddress(address: string): boolean{
    return (address!=null && address.length>0)
}


export {
    checkSecret,
    checkPublicKey,
    checkAddress
}