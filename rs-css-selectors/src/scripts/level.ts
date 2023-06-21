export default class Level {
  public id: string
  public title: string
  public subtitle: string
  public description: string
  public selectors: string[]
  public nameSelectors: string
  public examples: string[]
  public code: string

  constructor(
    id: string,
    title: string,
    subtitle: string,
    description: string,
    selectors: string[],
    nameSelectors: string,
    examples: string[],
    code: string
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.selectors = selectors
    this.nameSelectors = nameSelectors
    this.examples = examples
    this.code = code
    this.subtitle = subtitle
  }

  public checkAnswer(enteredSelector: string): boolean {
    if (this.selectors.includes(enteredSelector)) {
      return true
    } else {
      return false
    }
  }
}
