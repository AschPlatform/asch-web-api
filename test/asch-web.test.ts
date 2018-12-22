import AschWeb from "../src/asch-web"

/**
 * Dummy test
 */
describe("Normal test", () => {
  it("AschWeb must have util and API interface", () => {
    expect(AschWeb).toHaveProperty('util')
    expect(AschWeb).toHaveProperty('API')
    console.log(AschWeb)
  })
})
