import { Recipe, searchRecipes, MarmitonQueryBuilder } from '../src/marmiton-api'

/**
 * Dummy test
 */
describe('API', () => {
  it('Basic query', async () => {
    const recipes: Recipe[] = await searchRecipes('aqt=soja&rct=1&ttlt=40')
    recipes.map((r) => {
      console.log(r)
      for (const [key, value] of Object.entries(r)) {
        console.log(`${key} --> ${value}`)
        expect(value).not.toBeNaN()
        expect(value).not.toBeNull()
      }
    })
  })

  it('Should be able to get more than one page', async () => {
    const start = process.hrtime();
    const recipes: Recipe[] = await searchRecipes('aqt=soja', { limit: 46 })
    expect(recipes.length).toEqual(46);
    recipes.map((r) => {
      console.log(r)
      for (const [key, value] of Object.entries(r)) {
        console.log(`${key} --> ${value}`)
        expect(value).not.toBeNaN()
        expect(value).not.toBeNull()
      }
    })
    const end = process.hrtime(start);
    console.log(end)
  }, 13000)

  it("Simple builder request", async () => {
    const rb = new MarmitonQueryBuilder();
    const qs = rb.vegan().build();
    const recipes: Recipe[] = await searchRecipes(qs);
    console.log(recipes);
  })
})
