import {AschWeb} from '../../../dist/tsc'
const AschContract = AschWeb.AschContract

export class CrowdFundgingContract extends  AschContract {

 public payInitialToken(amount: string, currency: string): Promise<object>
 {
    return this.pay(currency, amount, this.name+'/'+'payInitialToken', 1000000, true)
 }

 public crowdFunding(amount: string, currency: string): Promise<object>
 {
    return this.pay(currency, amount, this.name, 1000000, true)
 }

 public getXXT(amount: string): Promise<object>
 {
    return this.call('getXXT', [amount], 1000000, true)
 }

 public getFunding(address: string): Promise<object>
 {
    return this.constans('getFunding', [address])
 }

 public get_totalFundingToken(): Promise<object>
 {
    return this.queryStates('totalFundingToken')
 }

 public get_avalibleToken(): Promise<object>
 {
    return this.queryStates('avalibleToken')
 }

 public get_sponsorAddress(): Promise<object>
 {
    return this.queryStates('sponsorAddress')
 }

 public get_offeringCurrency(): Promise<object>
 {
    return this.queryStates('offeringCurrency')
 }


}