

function checkSecret(secret: string): boolean{
    return (secret!=null && secret.length>0)
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