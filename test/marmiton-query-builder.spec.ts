import { MarmitonQueryBuilder } from '../src/components/marmiton-query-builder'
import { RECIPE_DIFFICULTY, RECIPE_PRICE, RECIPE_TYPE } from '../src/components/recipe-enums'

describe('Query Builder', () => {


  it('Should handle heavy restrictions', () => {
    const qb = new MarmitonQueryBuilder()
    const query = qb
      .withTitleContaining('soja')
      .vegan()
      .withPhoto()
      .withoutOven()
      .withPrice(RECIPE_PRICE.CHEAP)
      .takingLessThan(45)
      .withDifficulty(RECIPE_DIFFICULTY.EASY)
      .build()
    expect(query).toEqual('aqt=soja&prt=3&pht=1&rct=2&rct=3&exp=1&ttlt=45&dif=2')
  })

  it('Without providing a query string', () => {
    const qb = new MarmitonQueryBuilder()
    const query = qb
      .withType(RECIPE_TYPE.MAIN_COURSE)
      .vegetarian()
      .raw()
      .withoutDairyProducts()
      .withoutGluten()
      .build()
    // AQT must have been defaulted to ""
    expect(query).toEqual('dt=platprincipal&prt=1&rct=3&prt=4&prt=2&aqt=')
  })
})
