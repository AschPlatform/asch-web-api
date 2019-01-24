import AschWeb from '../src/asch-web'

/**
 * Dummy test
 */
describe('Normal test', () => {
  const host = 'http://mainnet.asch.cn/'
  let aschWeb = new AschWeb(host)
  it('AschWeb must have host prop', () => {
    expect(aschWeb).toHaveProperty('host')
    console.log(aschWeb)
  })

  it('AschWeb get block methon', async () => {
    let api = aschWeb.api
    let res = await api.get('api/v2/blocks', {})
    expect(res).toHaveProperty('blocks')
  })
})
