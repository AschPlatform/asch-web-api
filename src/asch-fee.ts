import { ObjectType, Transaction } from './type'

let feeFuncMap: { [index: number]: any } = {
  1: function(trs: Transaction): number {
    return 0.1
  },
  2: function(trs: Transaction): number {
    var len = trs.args[0].length
    if (len === 2) {
      return 200
    } else if (len === 3) {
      return 100
    } else if (len === 4) {
      return 80
    } else if (len === 5) {
      return 40
    } else if (len <= 10) {
      return 10
    } else {
      return 1
    }
  },
  3: function(trs: Transaction): number {
    return 5
  },
  4: function(trs: Transaction): number {
    return 0.1
  },
  5: function(trs: Transaction): number {
    return 0
  },
  6: function(trs: Transaction): number {
    return 5
  },
  7: function(trs: Transaction): number {
    return 100
  },
  8: function(trs: Transaction): number {
    return 0.1
  },
  9: function(trs: Transaction): number {
    return 0
  },
  10: function(trs: Transaction): number {
    return 100
  },
  11: function(trs: Transaction): number {
    return 0.1
  },
  12: function(trs: Transaction): number {
    return 0.1
  },
  100: function(trs: Transaction): number {
    return 100
  },
  101: function(trs: Transaction): number {
    return 500
  },
  102: function(trs: Transaction): number {
    return 0.1
  },
  103: function(trs: Transaction): number {
    return 0.1
  },
  200: function(trs: Transaction): number {
    return 100
  },
  201: function(trs: Transaction): number {
    return 1
  },
  202: function(trs: Transaction): number {
    return 1
  },
  203: function(trs: Transaction): number {
    return 1
  },
  204: function(trs: Transaction): number {
    return 0.1
  },
  205: function(trs: Transaction): number {
    return 0.1
  },
  300: function(trs: Transaction): number {
    return 10
  },
  301: function(trs: Transaction): number {
    return 0.1
  },
  302: function(trs: Transaction): number {
    return 0
  },
  400: function(trs: Transaction): number {
    return 0.1
  },
  401: function(trs: Transaction): number {
    return 100
  },
  402: function(trs: Transaction): number {
    return 0.01
  },
  403: function(trs: Transaction): number {
    return 0
  },
  404: function(trs: Transaction): number {
    return 0.01
  }
}

let calFee = function(trans: Transaction): Transaction {
  let type: number = trans.type
  let fee: number = feeFuncMap[type](trans)
  fee = fee * Math.pow(10, 8)
  trans.fee = fee
  return trans
}

export default calFee
