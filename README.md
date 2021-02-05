# Marmiton API

[![codecov](https://codecov.io/gh/SoTrxII/marmiton-api/branch/master/graph/badge.svg?token=8NANICXWL7)](https://codecov.io/gh/SoTrxII/marmiton-api)

A web-scraper made to get recipes from marmiton.org
The documentation is hosted [here](https://sotrxii.github.io/marmiton-api/)
## Installation

```
npm install marmiton-api
```

## Usage

```ts
import { searchRecipes, QueryBuilder, RECIPE_PRICE, RECIPE_DIFFICULTY } from 'marmiton-api'
// A query builder is provided to make complex queries
const query = qb
  .withTitleContaining('soja')
  .withoutOven()
  .withPrice(RECIPE_PRICE.CHEAP)
  .takingLessThan(45)
  .withDifficulty(RECIPE_DIFFICULTY.EASY)
  .build()
// Fetch the recipes
const recipes: Recipe[] = await searchRecipes(query)
```

By default, a maximum of 12 recipes will be returned, as it's the number of items per page in the website.
This number can be increased with the `limit` option, parsing multiple pages.

```ts
const recipes: Recipe[] = await searchRecipes(query, { limit: 48 })
```

Sample result :

```json
{
  "author": "lina_16542241",
  "ingredients": [
    "1 pot de yaourt soja nature",
    "1/2 pot d'huile",
    "2 pots de sucre",
    "2 pots de farine",
    "1 pot de maïzena",
    "1 oeuf",
    "1/2 sachet de levure",
    "Pomme",
    "Chocolat",
    "Noix de coco rapée",
    "Cannelle",
    "Chocolat fondu, etc..."
  ],
  "tags": ["Dessert", "Végétarien", "Petits gâteaux", "Gâteau", "Muffin"],
  "steps": [
    "Préchauffer le four à 180°C (thermostat 6).",
    "Dans un saladier, vider le pot de yaourt. Celui-ci servira de mesure.",
    "Ajouter l'huile. Mélanger.",
    "Ajouter le sucre. Mélanger.",
    "Ajouter la farine, puis la maïzena et la levure (tamisées si possible), tout en mélangeant.",
    "Ajouter l'oeuf. Bien mélanger.",
    "Ajouter à votre guise chocolat ou autre douceur pour obtenir des muffins encore meilleurs. Ils sont aussi très bons natures.",
    "Cuire pendant 15-20 min à 180°C dans des moules adaptés."
  ],
  "people": 12,
  "budget": 1,
  "difficulty": 2,
  "prepTime": 20,
  "totalTime": 35
}
```


