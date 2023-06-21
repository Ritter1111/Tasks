export default class Level {
  public id: string
  public title: string
  public subtitle: string
  public description: string
  public selectors: string[]
  public nameSelectors: string
  public examples: string[]
  public code: string
  public editorPanel: Element
  public buttonSubmit: Element

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

    this.editorPanel = document.querySelector('.layout-editor') as Element
    this.buttonSubmit = document.querySelector('.btn_enter') as Element
  }

  public checkAnswer(enteredSelector: string): boolean {
    this.editorPanel.classList.add('shake')
    // const currLevel = levels
    // console.log(currLevel)
    // const isAnswerCorrect = currLevel.checkAnswer(answerr)

    if (this.selectors.includes(enteredSelector)) {
      console.log('win')
      return true
    } else {
      return false
    }
    // this.checkCorrectAnswer()

    document.addEventListener('animationend', () => {
      this.editorPanel.classList.remove('shake')
    })

    // this.buttonSubmit.addEventListener('click', () => {
    //   // this.checkCorrectAnswer()
    //   console.log('d')
    // })
  }
}
