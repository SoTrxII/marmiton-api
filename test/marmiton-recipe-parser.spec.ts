import { RecipesParser } from '../src/components/recipes-parser'
import fetch from 'node-fetch'

describe('Recipe Parser', () => {
  it('Using a sample recipe', async () => {
    // The sample is store in a gist, to prevent the failure due to teh recipe being pulled
    // from the live website

    const sample = await (
      await fetch(
        'https://gist.githubusercontent.com/SoTrxII/299c3ee1750fc74526e4d8e0b4936944/raw/f26821214efd3aec90e0f4ca9d2841f6e348565b/sample_recipe.html'
      )
    ).text()
    const r = await RecipesParser.parseRecipe(sample)
    console.log(r)
    expect(r).toMatchObject({
      author: 'lina_16542241',
      ingredients: [
        '1 pots de yaourt soja nature',
        "1/2 pots d'huile",
        '2 pots de sucre',
        '2 pots de farine',
        '1 pots de maïzena',
        '1 oeufs',
        '1/2 sachets de levure',
        'pomme',
        'chocolat',
        'noix de coco rapée',
        'cannelle',
        'nappage chocolat',
      ],
      tags: [
        'Muffins au yaourt de soja',
        'muffin',
        'yaourt',
        'huile',
        'sucre',
        'farine',
        'maïzena',
        'oeuf',
        'levure',
        'pomme',
        'chocolat',
        'noix de coco rapée',
        'cannelle',
        'nappage chocolat',
        'facile',
        'bon marché',
      ],
      steps: [
        'Préchauffer le four à 180°C (thermostat 6).',
        'Dans un saladier, vider le pot de yaourt. Celui-ci servira de mesure.',
        "Ajouter l'huile. Mélanger.",
        'Ajouter le sucre. Mélanger.',
        'Ajouter la farine, puis la maïzena et la levure (tamisées si possible), tout en mélangeant.',
        "Ajouter l'oeuf. Bien mélanger.",
        'Ajouter à votre guise chocolat ou autre douceur pour obtenir des muffins encore meilleurs. Ils sont aussi très bons natures.',
        'Cuire pendant 15-20 min à 180°C dans des moules adaptés.',
      ],
      people: 12,
      budget: 1,
      difficulty: 2,
      prepTime: 15,
      totalTime: 35,
    })
  })

  it('With a high difficulty', async () => {
    const sample = await (
      await fetch(
        'https://www.marmiton.org/recettes/recette_poulet-fermier-pommes-de-terres-fleurs-de-courgettes_530770.aspx'
      )
    ).text()
    const r = await RecipesParser.parseRecipe(sample)

    expect(r!.difficulty).toBe(4)
    expect(r!.budget).toBe(3)
  })
})
