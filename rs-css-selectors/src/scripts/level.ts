import { CodeItem, ILevel } from './types'

export default class Level {
  public id: string
  public title: string
  public subtitle: string
  public description: string
  public selectors: Array<string>
  public nameSelectors: string
  public examples: string[]
  public code: CodeItem[]

  constructor(data: ILevel) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.selectors = data.selectors
    this.nameSelectors = data.nameSelectors
    this.examples = data.examples
    this.code = data.code
    this.subtitle = data.subtitle
  }

  public checkAnswer(enteredSelector: string): boolean {
    if (this.selectors.includes(enteredSelector)) {
      return true
    } else {
      return false
    }
  }
}
