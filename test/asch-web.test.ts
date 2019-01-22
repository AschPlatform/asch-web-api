import AschWeb from '../src/asch-web'

/**
 * Dummy test
 */
describe('Normal test', () => {
  it('AschWeb must have util and API interface', () => {
    expect(AschWeb).toHaveProperty('util')
    expect(AschWeb).toHaveProperty('API')
    console.log(AschWeb)
  })

  it('AschWeb get method', async () => {
    let api = new AschWeb.API({ get: '' }, '')
    api.useHttpProvider('http://mainnet.asch.cn/')
    let res = await api.get('api/v2/blocks', {})
    expect(res).toHaveProperty('blocks')
  })
})
