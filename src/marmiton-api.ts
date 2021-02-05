import { MarmitonQueryOptions } from './@types/marmiton-query-options'
import { Recipe } from './@types/recipe'
import { MarmitonQueryBuilder } from './components/marmiton-query-builder'
import { RECIPE_DIFFICULTY, RECIPE_PRICE, RECIPE_TYPE } from './components/recipe-enums'
import { RecipesParser } from './components/recipes-parser'
import fetch from 'node-fetch'

export class MarmitonError extends Error {}

const BASE_URL = 'https://www.marmiton.org'
const ENDPOINTS = {
  query: () => `${BASE_URL}/recettes/recherche.aspx`,
}
// Number of recipes per page
const RECIPES_PER_PAGE = 15
const PAGE_COUNTER = 12
const DEFAULT_OPTIONS = {
  limit: RECIPES_PER_PAGE,
}

/**
 * Search for recipes within marmiton.com
 * @param qs querystring to use. This can be generated with {@link MarmitonQueryBuilder}
 * @param opt
 */
export async function searchRecipes(
  qs: string,
  opt?: Partial<MarmitonQueryOptions>
): Promise<Recipe[]> {
  const options = Object.assign(DEFAULT_OPTIONS, opt)
  // With 12 Result per page, we need to run the query multiple times
  // in order to get more results than that
  const roundTrips = Math.ceil(options.limit / RECIPES_PER_PAGE)
  const roundTripsRange = Array.from(Array(roundTrips).keys())
  const recipes: Partial<Recipe>[] = []
  await Promise.all(
    roundTripsRange.map(async (i) => {
      let url = `${ENDPOINTS.query()}?${qs}`
      if (i > 0) url += `&start=${i * PAGE_COUNTER}`
      const htmlBody = await (await fetch(url)).text()
      recipes.push(...(await RecipesParser.parseSearchResults(htmlBody, BASE_URL)))
    })
  )
  return recipes.slice(0, options.limit) as Recipe[]
}

export { MarmitonQueryBuilder, RECIPE_PRICE, RECIPE_DIFFICULTY, RECIPE_TYPE }
export type { MarmitonQueryOptions, Recipe }
