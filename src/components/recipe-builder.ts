/**
 * Build a new Recipe JSON from parameter.
 * This isn't actually a true builder, as it's not building a class.
 * The purpose of this "builder" is to separate info retrieval and info formatting.
 */
import { Recipe } from '../@types/recipe'

export class RecipeBuilder {
  private infos: Partial<Recipe> = {}

  withName(name: string): this {
    this.infos['name'] = name
    return this
  }

  withDescription(desc: string): this {
    this.infos['description'] = desc
    return this
  }

  withUrl(url: string): this {
    this.infos['url'] = url
    return this
  }

  withRate(rate: number): this {
    this.infos['rate'] = rate
    return this
  }

  withTags(tags: string[]): this {
    this.infos['tags'] = tags
    return this
  }

  withDifficulty(d: number): this {
    this.infos['difficulty'] = d
    return this
  }

  withBudget(b: number): this {
    this.infos['budget'] = b
    return this
  }

  withAuthor(s: string): this {
    this.infos['author'] = s
    return this
  }

  withPeople(nb: number): this {
    this.infos['people'] = isNaN(nb) ? undefined : nb
    return this
  }

  withIngredients(ing: string[]): this {
    this.infos['ingredients'] = ing
    return this
  }

  withPreparationTime(prep: number): this {
    this.infos['prepTime'] = prep
    return this
  }

  withTotalTime(total: number): this {
    this.infos['totalTime'] = total
    return this
  }

  withSteps(steps: string[]): this {
    this.infos['steps'] = steps
    return this
  }

  withImages(images: string[]): this {
    this.infos['images'] = images
    return this
  }

  build() {
    return this.infos
  }
}
