
## What is AschWeb?

__[Asch Web - Developer Document](https://github.com/AschPlatform/asch-docs/blob/master/http_api/zh-cn.md)__

AschWeb aims to deliver a unified, seamless development experience influenced by Ethereum's [Web3](https://github.com/ethereum/web3.js/) implementation. We have taken the core ideas and expanded upon it to unlock the functionality of ASCH's unique feature set along with offering new tools for integrating DApps in the browser, Node.js and IoT devices.

## Compatibility
- Version built for Node.js v6 and above
- Version built for chrome browsers  

You can access either version specifically from the `dist/` folder.

AschWeb is also compatible with frontend frameworks such as Angular, React and Vue.

You can also ship AschWeb in a Chrome extension.

## Installation

<!-- ```
npm install aschweb
``` -->

## Example

To look at the examples, first clone this repo, install the dependencies and run the example:
```
git clone https://github.com/kimziv/AschWeb.git
cd AschWeb
yarn
yarn build -d
yarn example
```
The example is at `examples/server/index.js`.

<!-- ## ASCH provides a private network to test with

* Test Node - http://testnet.asch.io

* You can also set up your own private network, but you need to solve cross-domain CORS. The following example in Node reads from a full node listening on 16667 and a solidity node listening on 16668, and exposes the ports 8090 and 8091 with the needed headers.

```
var express = require('express');
var proxy = require('http-proxy-middleware');

function onProxyRes(proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  console.log(req.originalUrl)
}

var fullnode = express();
fullnode.use('/', proxy({
  target: 'http://127.0.0.1:16667',
  changeOrigin: true,
  onProxyRes
}));
fullnode.listen(8090);

var soliditynode = express();
soliditynode.use('/', proxy({
  target: 'http://127.0.0.1:16668',
  changeOrigin: true,
  onProxyRes,
  onError
}));
soliditynode.listen(8091); -->
```


## Creating an Instance

First off, in your javascript file, define AschWeb:

```js
const AschWeb = require('aschWeb')
```
Specify the API endpoints:
```js
const HttpProvider = AschWeb.providers.HttpProvider;
const fullNode = new HttpProvider(' http://testnet.asch.io'); // Full node http endpoint
```
The provider above is optional, you can just use a url for the nodes instead, like here:

```js
const fullNode = 'http://testnet.asch.io';
```
Now, instance a aschWeb object:
```js
const mnemonic = 'define wise club transfer top crystal enrich rely nice scout talent romance';

const aschWeb = new AschWeb(
    fullNode,
    mnemonic,
    false
);

```
#### A full example:
```js
const AschWeb = require('aschweb')
const HttpProvider = AschWeb.providers.HttpProvider; // This provider is optional, you can just use a url for the nodes instead
const mnemonic = 'define wise club transfer top crystal enrich rely nice scout talent romance';

const aschWeb = new AschWeb(
    fullNode,
    mnemonic,
    false
);


async function getAccount() {
    // The majority of the function calls are asynchronus,
    // meaning that they cannot return the result instantly.
    // These methods therefore return a promise, which you can await.
    const account = await aschWeb.asch.accounts(address);
    console.log('account info:',account);

    // You can also bind a `then` and `catch` method.
    aschWeb.asch.accounts(address).then(account => {
        console.log({account});
    }).catch(err => console.error(err));

    // If you'd like to use a similar API to Web3, provide a callback function.
    aschWeb.asch.accounts(address, (err, account) => {
        if (err)
            return console.error(err);

        console.log({account});
    });
}

getAccount();

```
#### Note:

For testing AschWeb API functions, it would be best to setup a private network on your local machine using the <a href="https://developers.asch.network/docs/getting-started-1" target="_blank">ASCH Docker Quickstart guide</a>. The guide sets up a node server on your machine. You can then deploy smart contracts on your network and interact with them via AschWeb. If you wish to test AschWeb with other users, it would be best to deploy your contracts/DApps on the test network and interact from there.  
