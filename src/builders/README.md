Table of Contents
===============
# TransactionBuilder 使用说明

## **1 普通交易**  

### **1.1 在主链转账XAS,type=1**

`TransactionBuilder.transferXAS(amount: number | string, to: string, message: string): Transaction`
`备注` 在主链的交易类型为1

- `recipientId` 接收者地址
- `amount` 转账数量
- `message` 转账附言

```
```

### **1.2 设置昵称,type=2**

`TransactionBuilder.setName(name: string): Transaction`
`备注` 在主链的交易类型为2

- `name` 昵称

```
```

### **1.3 设置二级密码,type=3**

`TransactionBuilder.setSecondPassword(secondPwd: string): Transaction`
`备注` 在主链的交易类型为3

- `secondPwd` 二级密码

```
```

### **1.4 锁仓,type=4**

`TransactionBuilder.setLock(height: number, amount: number): Transaction`
`备注` 在主链的交易类型为4

- `height` 锁仓高度
- `amount` 锁仓XAS数量

```
```

### **1.5 解锁,type=5**

`TransactionBuilder.unlock(): Transaction`
`备注` 在主链的交易类型为4


```
```

### **1.6 设置多签账户, type=6**

`TransactionBuilder.setMultiAccount(): Transaction`
`备注` 在主链的交易类型为6


```
```
 
 ### **1.7 设置多签账户,type=7**

`TransactionBuilder.registerAgent(): Transaction`
`备注` 在主链的交易类型为7


```

```

 ### **1.8 设置投票代理人,type=8**

`TransactionBuilder.setAgent(agent: string): Transaction`
`备注` 在主链的交易类型为8

- `agent` 代理人昵称

```
```

 
 ### **1.9 取消投票代理,type=9**

`TransactionBuilder.repealAgent(): Transaction`
`备注` 在主链的交易类型为9


```
```
 
 ### **1.10 注册为受托人,type=10**

`TransactionBuilder.registerDelegate(): Transaction`
`备注` 在主链的交易类型为10


```
```
 
  ### **1.11 受托人投票,type=11**

`TransactionBuilder.voteDelegate(delegates: string[]): Transaction`
`备注` 在主链的交易类型为11

- `delegates` 受托人公钥数组

```
```

 ### **1.12 撤销受托人投票,type=12**

`TransactionBuilder.cleanVote(delegates: string[]): Transaction`
`备注` 在主链的交易类型为12

- `delegates` 受托人公钥数组

```
```

## **2 资产相关UIA**  

 ### **2.1 注册发行商,type=100**

`TransactionBuilder.registerIssuer(name: string, desc: string): Transaction`
`备注` 在主链的交易类型为4

- `name` 发行商名称
- `desc` 描述

```
```

### **2.2 注册资产,type=101**

`TransactionBuilder.registerAsset(symbol: string, desc: string, maximum: number, precision: number): Transaction`

`备注` 在主链的交易类型为4

- `symbol` 资产名称
- `desc` 描述
- `maximum` 上限
- `precision` 精度

```
```
 

 ### **2.3 发行资产,type=102**

`TransactionBuilder.issueAsset(symbol: string, amount: string): Transaction`

`备注` 在主链的交易类型为4

- `symbol` 资产名称
- `amount` 发行数量

```
```

 ### **2.4 资产转账,type=103**

`TransactionBuilder.transferAsset(symbol: string, amount: string, recipientId: string, message: string): Transaction`

`备注` 在主链的交易类型为4

- `symbol` 资产名称
- `amount` 数量
- `recipientId` 接收人地址
- `message` 备注

```
```

## **3 Dapp相关** 

 ### **3.1 注册Dapp, type=200**

`TransactionBuilder.registerDapp(name: string,desc: string,tags: string,link: string,icon: string,category: string,delegates: number,nlockNumber: number): Transaction`

`备注` 在主链的交易类型为4

- `name` 名称
- `desc` 描述
- `tags` 标签
- `link` 链接
- `icon` 图标
- `category` 类别
- `delegates` 受托人
- `nlockNumber` 最小受托人数量

```
```

 ### **3.2 更新Dapp记账人,type=201**

`TransactionBuilder.updateBooker(dappId: string, from: string, to: string): Transaction`

`备注` 在主链的交易类型为4

- `dappId` Dapp ID
- `from` 旧的记账人公钥
- `to` 新的记账人公钥

```
```


 ### **3.3 添加Dapp记账人,type=202**

`TransactionBuilder.addBooker(dappId: string, key: string): Transaction`

`备注` 在主链的交易类型为202

- `dappId` Dapp ID
- `key` 记账人公钥

```
```

### **3.4 删除Dapp记账人,type=203**

`TransactionBuilder.deleteBooker(dappId: string, key: string): Transaction`

`备注` 在主链的交易类型为4

- `dappId` Dapp ID
- `key` 记账人公钥

```
```
 
### **3.5 Dapp充值,type=204**

`TransactionBuilder.depositDapp(dappId: string, currency: string, amount: string): Transaction`

`备注` 在主链的交易类型为4

- `dappId` Dapp ID
- `currency` 资产名称
- `amount` 数量

```
```

### **3.6 Dapp提现,type=205**

`TransactionBuilder.withdrawDapp(dappId: string, recipient: string, amount: string, wid: string, signatures: string): Transaction`

`备注` 在主链的交易类型为4

- `dappId` Dapp ID
- `recipient` 接受者地址
- `amount` 锁仓XAS数量
- `wid` 提现ID
- `signatures` 签名

```
```
 
 ## **4 提案相关** 

 ### **4.1 发起提案,type=300**

`TransactionBuilder.createProposal(title: string, desc: string, topic: string, content: string, endHeight: number): Transaction`

`备注` 在主链的交易类型为4

- `title` 标题
- `desc` 描述
- `topic` 主题
- `content` 内容
- `endHeight` 生效高度

```
```

### **4.2 对提案投票,type=301**

`TransactionBuilder.voteProposal(pid: string): Transaction`

`备注` 在主链的交易类型为301

- `pid` 提案ID

```
```
 
 ### **4.3 激活提案,type=302**

`TransactionBuilder.activateProposal(pid: string): Transaction`

`备注` 在主链的交易类型为302

- `pid` 提案ID

```
```

## **5 网关相关** 

 ### **5.1 网关开户,type=400**

`TransactionBuilder.openGatewayAccount(gateway: string): Transaction`

`备注` 在主链的交易类型为4

- `gateway` 网关名称

```
```

### **5.2 网关注册候选人,type=401**

`TransactionBuilder.registerGateway(gateway: string, publicKey: string, desc: string): Transaction`

`备注` 在主链的交易类型为4

- `gateway` 网关名称
- `publicKey` 公钥
- `desc` 描述

```
```
 
 ### **5.3 网关充值,type=402**

`TransactionBuilder.depositGateway(address: string, currency: string, amount: string): Transaction`

`备注` 在主链的交易类型为4

- `address` 地址
- `currency` 资产名称
- `amount` 数量

```

```

### **5.4 网关提现,type=403**

`TransactionBuilder.withdrawGateway(address: string,gateway: string,currency: string,amount: number,fee: number): Transaction`

`备注` 在主链的交易类型为403

- `address` 地址
- `gateway` 网关名称
- `currency` 资产名称
- `amount` 数量

```

```
 

 ## **6 合约相关** 

 ### **6.1 注册合约,type=600**

`TransactionBuilder.registerContract(asLimit: number,name: string,version: string,desc: string,code: string,consumeOwnerEnergy: boolean): Transaction`

`备注` 在主链的交易类型为600

- `gasLimit`  最大消耗的Gas, 10,000,000 >gasLimit> 0
- `name` 智能合约名称，全网唯一，3 ~ 32个字母或数字组成
- `version` 合约引擎版本，目前请填v1.0
- `desc` 智能合约的描述，长度不超过255的字符串
- `code` 智能合约代码，长度不超过16K
- `consumeOwnerEnergy` 是否优先消耗合约所有者的能量


### **6.2 调用合约方法,type=601**

`TransactionBuilder.callContract(gasLimit: number,enablePayGasInXAS: boolean,contractName: string,method: string,methodArgs: Array<any>): Transaction`

`备注` 在主链的交易类型为4


- `gasLimit`  最大消耗的Gas, 10,000,000 >gasLimit> 0
- `enablePayGasInXAS` 当调用者能量不足时，是否使用XAS支付Gas
- `contractName` 智能合约名称
- `method` 要调用的方法名称
- `methodArgs` 调用方法所需要的参数列表

### **6.3 转账到合约,type=602**

`TransactionBuilder.payContract(gasLimit: number,enablePayGasInXAS: boolean,receiverPath: string,amount: string,currency: string): Transaction`

`备注` 在主链的交易类型为4

- `gasLimit`  最大消耗的Gas, 10,000,000 >gasLimit> 0
- `enablePayGasInXAS` 当调用者能量不足时，是否使用XAS支付Gas
- `receiverPath` 接收转账的路径（由合约地址或名称、'/'、接收方法名称组成，如接收方法是默认接收方法则'/'和接收方法可以省略）
- `amount` 转账金额
- `currency` 转账资产名称
