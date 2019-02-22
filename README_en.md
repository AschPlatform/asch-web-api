
## 什么事asch-web?

__[asch-web - Developer Document](https://github.com/AschPlatform/asch-docs/blob/master/http_api/zh-cn.md)__
asch-web是一个通过HTTP请求与ASCH节点进行通信的js库。asch-web提供常用的交易写操作API和常用的工具函数，诸如XAS转账，合约执行，账户创建，助记词，公钥和地址转和交易离线签名等等，asch-web受到Ethereum的[web3.js](https://github.com/ethereum/web3.js/)库的设计思想，提供统一的，无缝的开发体验。我们用核心思想对其进行了扩展，集成了ASCH常用的API，asch-web用typescript语言进行编写，可以build生成浏览器环境和node环境的js库，也可以直接在typescript项目中直接引用使用，对于DAapps与asch节点的交互提供了极大的方便。

## 兼容性
- 支持Node.js v8及更高版本构建的版本
- 支持Chrome浏览器环境

您可以从`dist /`文件夹中专门访问这两个版本。
asch-web还兼容前端框架，如Angular，React和Vue。
您也可以在Chrome扩展程序中集成asch-web。

## 安装

<!-- ```
npm install aschweb
``` -->

## 实例

首先使用git克隆asch-web项目, 安装依赖并且运行示例：
```
git clone https://github.com/AschPlatform/asch-web
cd asch-web
npm install
npm run example
```
实例源码在`examples/server/index.js`.

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
