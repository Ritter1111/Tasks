export default class Level {
  public id: string
  public title: string
  public description: string
  public selectors: string[]
  public nameSelectors: string
  public examples: string[]
  public code: string

  constructor(
    id: string,
    title: string,
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
  }
}
