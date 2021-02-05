import { RecipesParser } from '../src/components/recipes-parser'
import fetch from 'node-fetch'

describe('Recipe Parser', () => {
  it('Using a sample recipe', async () => {
    // The sample is store in a gist, to prevent the failure due to teh recipe being pulled
    // from the live website
    const sample = await (
      await fetch(
        'https://gist.githubusercontent.com/SoTrxII/299c3ee1750fc74526e4d8e0b4936944/raw/50cb2306649e9d4af23957655b2e46ee044b55f0/sample_recipe.html'
      )
    ).text()
    const r = await RecipesParser.parseRecipe(sample)
    expect(r).toMatchObject({
      author: 'lina_16542241',
      ingredients: [
        '1 pot de yaourt soja nature',
        "1/2 pot d'huile",
        '2 pots de sucre',
        '2 pots de farine',
        '1 pot de maïzena',
        '1 oeuf',
        '1/2 sachet de levure',
        'Pomme',
        'Chocolat',
        'Noix de coco rapée',
        'Cannelle',
        'Chocolat fondu, etc...',
      ],
      tags: ['Dessert', 'Végétarien', 'Petits gâteaux', 'Gâteau', 'Muffin'],
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
      prepTime: 20,
      totalTime: 35,
    })
  })
})
