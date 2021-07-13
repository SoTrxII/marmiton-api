/**
 * How much money would be spent by buying all the
 * stuff required to make the recipe.
 * There doesn't seems to be a direct money equivalent.
 */
export enum RECIPE_PRICE {
  /**
   * Let's roll out the pasta
   */
  CHEAP = 1,
  /**
   * Your average meal.
   */
  MEDIUM,
  /**
   * Lobsters and such ?
   */
  EXPENSIVE,
}

export enum RECIPE_DIFFICULTY {
  VERY_EASY = 1,
  EASY,
  MEDIUM,
  HARD,
}

export enum RECIPE_TYPE {
  STARTER = 'entree',
  MAIN_COURSE = 'platprincipal',
  DESSERT = 'dessert',
  SIDE_DISH = 'accompagnement',
  SAUCE = 'sauce',
  BEVERAGE = 'boisson',
  /**
   * Anything sugary
   */
  CANDY = 'confiserie',
  /**
   * How to be a better chef.
   * This one is weird.
   */
  ADVICE = 'conseil',
}
