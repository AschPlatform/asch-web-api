
 var AschWeb = require('../../dist/browserify-asch-web')
 var HTTPProvider = AschWeb.HTTPProvider

 console.log(AschWeb)
//  var asch = require('../../dist/lib/asch-web')
//  var AschApi =require('../../dist/lib/asch-api')
// var HTTPProvider = asch.HTTPProvider

const host = 'http://mainnet.asch.cn/'
const secret = 'quantum jelly guilt chase march lazy able repeat enrich fold sweet sketch'
const secondSecret = '' //'11111111a'
const address = 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2'
const to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'
const dappId = '25be71c296430a409cfeaf1ffaa957d18793f3695db07a846c22a7c467c45994'
var provider = new HTTPProvider(host)
var aschWeb = new AschWeb.default(provider, secret, secondSecret)
 console.log(aschWeb)
 aschWeb.api
  .transferXAS(1000000, to, 'test')
  .then(res => {
    console.log('\n\n transferXAS response:' + JSON.stringify(res))
  })
  .catch(err => {
    console.error(err)
  })

