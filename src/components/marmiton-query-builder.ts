import { RECIPE_DIFFICULTY, RECIPE_PRICE, RECIPE_TYPE } from './recipe-enums'

export class MarmitonQueryBuilder {
  private queryString = new URLSearchParams()

  withTitleContaining(q: string): this {
    this.queryString.append('aqt', encodeURIComponent(q))
    return this
  }

  withPrice(p: RECIPE_PRICE): this {
    this.queryString.append('exp', String(p))
    return this
  }

  withDifficulty(d: RECIPE_DIFFICULTY): this {
    this.queryString.append('dif', String(d))
    return this
  }

  withType(t: RECIPE_TYPE): this {
    this.queryString.append('dt', t)
    return this
  }

  takingLessThan(minutes: number): this {
    this.queryString.append('ttlt', String(minutes))
    return this
  }

  vegetarian(): this {
    this.queryString.append('prt', '1')
    return this
  }

  vegan(): this {
    this.queryString.append('prt', '3')
    return this
  }

  withoutGluten(): this {
    this.queryString.append('prt', '2')
    return this
  }

  withoutDairyProducts(): this {
    this.queryString.append('prt', '4')
    return this
  }

  /**
   * Without any cooking whatsoever
   */
  raw(): this {
    this.queryString.append('rct', '3')
    return this
  }

  withoutOven(): this {
    this.queryString.delete('rct')
    this.queryString.append('rct', '2')
    this.queryString.append('rct', '3')
    return this
  }

  /**
   * There must be photo of the final product.
   */
  withPhoto(): this {
    this.queryString.append('pht', '1')
    return this
  }

  build(): string {
    // The title query in mandatory, but can be empty
    if (!this.queryString.has('aqt')) {
      this.queryString.set('aqt', '')
    }
    return this.queryString.toString()
  }
}
