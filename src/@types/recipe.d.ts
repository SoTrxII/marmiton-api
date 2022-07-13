export interface Recipe {
  name: string

  /**
   * Short description provided by the recipe author
   */
  description: string

  /**
   * Link to the recipe on Marmiton's site
   */
  url: string

  /**
   * Mean of user reviews (up to 5.0)
   */
  rate: number

  /**
   * Images provided with the recipe. Often the final product.
   */
  images: string[]

  /**
   * Tags associated with the recipe
   */
  tags: string[]

  /**
   * Estimated difficulty of making this meal. On a scale from 1 (very easy)
   * to 4 (hard).
   * {@link RECIPE_DIFFICULTY}
   */
  difficulty: number

  /**
   * Price of making the meal. On a scale from 1 (Cheap) to 3 (Expensive)
   * {@link RECIPE_PRICE}
   */
  budget: number

  /**
   * Recipe uploader. Can be an username, "anonymous" or "undefined" (admin-provided recipe ?)
   */
  author: string

  /**
   * How many people
   */
  people: number

  /**
   * Stuff required to make the recipe
   */
  ingredients: string[]

  /**
   * Time required to make the recipe without cooking.
   */
  prepTime: number

  /**
   * Time required to make the recipe including cooking.
   */
  totalTime: number

  /**
   * All the steps to follow to make the meal
   */
  steps: string[]
}
