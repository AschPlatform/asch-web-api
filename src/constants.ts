export const XAS_PRECISION = 100000000
export const CLIENT_DRIFT_SECONDS = 5
export const LOCAL_NET_MAGIC = '594fe0f3'
export const TEST_NET_MAGIC = '594fe0f3'
export const MAIN_NET_MAGIC = '5f5b3cf5'


export const URLS = {
    server: {
        development: 'http://testnet.asch.io',
        production: 'http://mainnet.asch.io',
        test: 'http://testnet.asch.io'
    },
    accounts: {
        mock: '/data/home/accounts.json',
        open: '/api/accounts/open/',
        open2: '/api/accounts/open2/',
        url: '/api/accounts',
        new: '/api/accounts/new',
        count: '/api/accounts/count',
        deletates_voted: '/api/accounts/delegates'
    },
    // 余额账单Apiget /api/transactions
    transactions: {
        mock: '/data/home/transactions.json',
        url: '/api/transactions',
        uncomfirmed: '/api/transactions/unconfirmed',
        uncomfirmed_detail: '/api/transactions/unconfirmed/get'
    },
    // 详情基本信息
    blocks: {
        mock: '/data/blockDetail/getblocks.json',
        detail: '/api/blocks/get',
        height: '/api/blocks/getHeight',
        milestone: '/api/blocks/getMilestone',
        reward: '/api/blocks/getReward',
        supply: '/api/blocks/getSupply',
        status: '/api/blocks/getStatus',
        full: '/api/blocks/full'
    },
    //deletates
    delegates: {
        count: '/api/delegates/count',
        voters: '/api/delegates/voters',
        detail: '/api/delegates/get',
        list: '/api/delegates',
        forging_status: '/api/delegates/forging/status',

    },
    peers: {
        list: '/api/peers',
        version: '/api/peers/version',
        detail: '/api/peers/get',

    },
    loder: {
        status: '/api/loader/status',
        status_sync: '/api/loader/status/sync'
    },


    // ===== 1.4  v2 api ======
    v2: {
        // 账户查询 ps: name params is avaliable now
        accounts: {
            detail: '/api/v2/accounts/:address',
            balances: '/api/v2/balances/:address',
            pledges: '/api/v2/pledges'
        },
        
        transactions: {
            /**
             * 获取交易列表
             */
            list: '/api/v2/transactions',
            /**
             * 获取交易详情
             */
            detail: '/api/v2/transactions/:tid'
        },
        transfers: {
            /**
             * 获取转账记录
             */
            list: '/api/v2/transfers'
        },
        blocks: {
            list: '/api/v2/blocks',
            detail: '/api/v2/blocks/:idOrHeight'
        },
        proposals: {
            list: '/api/v2/proposals',
            detail: '/api/v2/proposals/:id',

        },
        // 获取所有网关
        gateways: {
            list: '/api/v2/gateways',
            validators: '/api/v2/gateways/:name/validators',
            currencies_all: '/api/v2/gateways/currencies',
            currencies_one: '/api/v2/gateways/:name/currencies',
            account_all: '/api/v2/gateways/accounts/:address',
            account_one: '/api/v2/gateways/:name/accounts/:address',
            deposits: '/api/v2/gateways/deposits/:address/:currency',
            withdrawals: '/api/v2/gateways/withdrawals/:address/:currency',
        },
        agents: {
            list: '/api/v2/agents',
            clienteles: 'api/v2/agents/:name/clienteles',
            group: 'api/v2/groups/:address'
        },
        chains: {
            list: 'api/v2/chains'
        },
        uia: {
            issuers_list: '/api/v2/uia/issuers',
            issuers_detail: '/api/v2/uia/issuers/:address',
            assets_one: '/api/v2/uia/issuers/:address/assets',
            assets_all: '/api/v2/uia/assets',
            assets_detail: '/api/v2/uia/assets/:name',
            balances: '/api/uia/balances/:address',
        },
        contracts: {
            list: '/api/v2/contracts/',
            detail: '/api/v2/contracts/:name',
            code: '/api/v2/contracts/:name/code',
            metadata: '/api/v2/contracts/:name/metadata',
            states: '/api/v2/contracts/:name/states/:path',
            results: '/api/v2/contracts/:name/results/:tid',
            constants_method: '/api/v2/contracts/:name/constant/:method'
        }
    },

    // 区分 local 与 mainnet 的请求头参数
    magics: {
        development: '594fe0f3',
        production: '5f5b3cf5'
    }
}