import { parse, HTMLElement } from 'node-html-parser'
import { RecipeBuilder } from './recipe-builder'
import fetch from 'node-fetch'
import { Recipe } from '../@types/recipe'

export class RecipesParser {
  static async parseSearchResults(dom: string, baseUrl: string): Promise<Partial<Recipe>[]> {
    return Promise.all(
      parse(dom)
        .querySelectorAll('.recipe-card')
        .map(async (e) => {
          const url = new URL(
            e.querySelector('a.recipe-card-link').getAttribute('href')!.trim(),
            baseUrl
          )
          // Get as many info as we can from the recipe search result
          // These cannot be undefined.
          const rb = new RecipeBuilder()
            .withName(this.selectText(e, 'h4.recipe-card__title'))
            .withDescription(this.selectText(e, '.recipe-card__description'))
            .withRate(Number(this.selectText(e, 'span.recipe-card__rating__value')))
            .withUrl(url.toString())
          // Load the recipe page
          const dom = await (await fetch(url.toString())).text()
          return this.parseRecipe(dom, rb)
        })
    )
  }

  static async parseRecipe(
    dom: string,
    rb: RecipeBuilder = new RecipeBuilder()
  ): Promise<Partial<Recipe>> {
    // Set "raw" attributes. These doesn't need any processing steps
    const recipeRoot = parse(dom)
    rb.withAuthor(this.selectText(recipeRoot, 'span.recipe-author__name'))
      .withIngredients(this.fetchList(recipeRoot, 'li.recipe-ingredients__list__item'))
      .withTags(this.fetchList(recipeRoot, 'ul.mrtn-tags-list li.mrtn-tag'))
      .withSteps(this.fetchList(recipeRoot, 'li.recipe-preparation__list__item'))
      .withPeople(Number(this.selectText(recipeRoot, 'span.title-2.recipe-infos__quantity__value')))

    // French attributes
    // To avoid having to translate the prompted french, the attributes values are instead
    // inferred from the class itself
    rb.withBudget(this.parseLevelFromClass(recipeRoot, '.recipe-infos__budget div')).withDifficulty(
      this.parseLevelFromClass(recipeRoot, '.recipe-infos__level div')
    )

    // Times based attributes. Must be formatted
    rb.withPreparationTime(
      this.formatTime(this.selectText(recipeRoot, 'span.recipe-infos__timmings__value'))
    ).withTotalTime(
      this.formatTime(this.selectText(recipeRoot, 'span.title-2.recipe-infos__total-time__value'))
    )

    return rb.build()
  }

  /**
   * Format a string to minutes
   * @param time
   * @private
   */
  private static formatTime(time: string): number {
    const hoursFormat = new RegExp(/(\d+)\s*h\s*(\d+)/)
    const minFormat = new RegExp(/(\d+)\s*min/)
    let formatted = 0
    if (hoursFormat.test(time)) {
      const match = time.match(hoursFormat)
      formatted = Number(match![1]) * 60 + Number(match![2])
    } else if (minFormat.test(time)) {
      formatted = Number(time.match(minFormat)![1])
    }
    return formatted
  }

  private static parseLevelFromClass(e: HTMLElement, className: string): number {
    return Number(
      e
        .querySelector(className)
        ?.getAttribute('class')
        ?.match(/container--level-(\d)/)?.[1]
    )
  }

  private static fetchList(e: HTMLElement, listClass: string) {
    let list: string[] = []
    try {
      list = e.querySelectorAll(listClass).map((e) => this.getCleanText(e))
    } catch (e) {
      // Optional attribute, failing to retrieve it isn't noteworthy
    }
    return list
  }

  private static selectText(root: HTMLElement, selector: string) {
    return this.getCleanText(root.querySelector(selector))
  }

  private static getCleanText(e: HTMLElement) {
    return e?.text
      ?.trim()
      .replace(/[\n\r\t]/g, '')
      .replace(/\s+/, ' ')
  }
}
