// import CodeMirror from 'codemirror'
import Level from './level'
import { levels } from './levels'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import burgerView from './burgerView'
import { ILevel } from './types'

export const burger = new burgerView()

hljs.registerLanguage('xml', xml)

export default class Game {
  private panel: Element
  public levels: Level[]
  private image: Element
  private title: Element
  private subtitle: Element
  private levelsTag: Element
  private description: Element
  private examples: Element
  private gameTitle: Element
  public indexLevel: number
  private level: Element
  public buttonSubmit: Element
  public inputArea: HTMLInputElement
  public editorPanel: Element
  public progressElement: HTMLElement
  public facheck: HTMLElement
  public btnHelp: HTMLElement
  public isAnswerEntered: boolean

  constructor() {
    this.panel = document.querySelector('.panel-right') as Element
    this.image = document.querySelector('.person') as Element
    this.title = document.querySelector('.levels_title') as Element
    this.subtitle = document.querySelector('.levels_subtitle') as Element
    this.levelsTag = document.querySelector('.levels_type_tag') as Element
    this.description = document.querySelector('.levels_description') as Element
    this.examples = document.querySelector('.levels_example_text') as Element
    this.gameTitle = document.querySelector('.game_title') as Element
    this.level = document.querySelector('.sidebar-lvl_header__text') as Element
    this.buttonSubmit = document.querySelector('.btn_enter') as Element
    this.inputArea = document.querySelector('.panel_input') as HTMLInputElement
    this.editorPanel = document.querySelector('.layout-editor') as Element
    this.progressElement = document.querySelector('.progress') as HTMLElement
    this.facheck = document.querySelector('.fa-check') as HTMLElement
    this.btnHelp = document.querySelector('.btn_help') as HTMLElement
    this.isAnswerEntered = false

    this.indexLevel = 0
    this.levels = levels.map((level: ILevel) => new Level(level))
  }

  initGame = () => {
    burger.init()
    this.getLevelInfo()
    this.checkCompletedLevels(this.facheck)
    this.renderLevel(this.levels[this.indexLevel])

    const angleRight = document.querySelector('.fa-angle-right') as HTMLElement
    angleRight.addEventListener('click', this.moveToNextLevel.bind(this))

    const angleLeft = document.querySelector('.fa-angle-left') as HTMLElement
    angleLeft.addEventListener('click', this.moveToPreviousLevel.bind(this))

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const isAnserCorrect = this.getCurrentLevel().checkAnswer(
          (event.target as HTMLInputElement).value.replace(/ /g, '')
        )
        this.checkCorrectAnswer(isAnserCorrect)
      }
    })

    document.addEventListener('animationend', () => {
      this.editorPanel.classList.remove('shake')
      this.image.classList.remove('image-element')
    })

    this.btnHelp.addEventListener('click', () => {
      this.isAnswerEntered = false
      this.writeAnswerSelector()
      this.inputArea.focus()
    })

    this.inputArea.addEventListener('input', (e) => {
      const inputValue = (e.target as HTMLInputElement).value
      if (inputValue === '') {
        this.inputArea.classList.add('blink-animation')
      } else {
        this.inputArea.classList.remove('blink-animation')
      }
    })

    this.buttonSubmit.addEventListener('click', () => {
      const isAnserCorrect = this.getCurrentLevel().checkAnswer(
        this.inputArea.value.replace(/ /g, '')
      )
      this.checkCorrectAnswer(isAnserCorrect)
    })
  }

  public renderLevel(level: Level) {
    this.clearLevel()
    burger.renderMenuLevels()
    this.setProgressWidth()

    const panel = document.createElement('pre')
    panel.textContent = level.code
    this.panel.append(panel)
    hljs.highlightElement(panel)

    if (localStorage.getItem(`level_${level.id}`)) {
      this.facheck.classList.add('completed')
    } else {
      this.facheck.classList.remove('completed')
    }

    this.inputArea.classList.add('blink-animation')

    this.image.innerHTML = level.code
    this.level.innerHTML = `Level ${level.id} of 10`

    const nodes = document.querySelectorAll(
      '.person ' + level.selectors[0]
    ) as NodeListOf<HTMLElement>

    nodes.forEach((node) => {
      node.classList.add('animated')
    })

    this.title.append(level.title)
    this.gameTitle.append(level.subtitle)
    this.subtitle.append(level.subtitle)
    this.levelsTag.append(level.nameSelectors)
    this.description.innerHTML = level.description

    level.examples.forEach((el) => {
      this.examples.innerHTML = el
    })
  }

  public moveToNextLevel(): void {
    const nextLevel = this.getNextLevel()
    if (nextLevel) {
      this.renderLevel(nextLevel)
      this.saveLevelInfo()
      this.increaseProgressWidth()
    }
  }

  public moveToPreviousLevel(): void {
    const previousLevel = this.getPreviousLevel()
    if (previousLevel) {
      this.renderLevel(previousLevel)
      this.saveLevelInfo()
      this.reduceProgressWidth()
    }
  }

  public getNextLevel(): Level | void {
    if (this.indexLevel < levels.length - 1) {
      this.indexLevel++
      return this.levels[this.indexLevel]
    }
  }

  public getCurrentLevel(): Level {
    return this.levels[this.indexLevel]
  }

  public getPreviousLevel(): Level | void {
    if (this.indexLevel > 0) {
      this.setCurrentLevelIndex(this.indexLevel - 1)
      return this.levels[this.indexLevel]
    }
  }

  public saveLevelInfo() {
    localStorage.setItem('currentLevel', this.indexLevel.toString())

    for (let i = 0; i <= this.indexLevel; i++) {
      const level = this.levels[i]
      const isAnswerCorrect = level.checkAnswer(this.inputArea.value)
      if (isAnswerCorrect) {
        localStorage.setItem(`level_${level.id}`, 'completed')
      }
    }
  }

  public getLevelInfo(): void {
    const storedLevel = localStorage.getItem('currentLevel')
    if (storedLevel) {
      this.indexLevel = +storedLevel
    }
  }

  public setCurrentLevelIndex(index: number) {
    this.indexLevel = index
  }

  public increaseProgressWidth(): void {
    const progressWidth = ((this.indexLevel + 1) * 100) / this.levels.length
    this.progressElement.style.width = `${progressWidth}%`
  }

  public getProgressWidth(): number {
    return (
      ((this.indexLevel + 1) * 100) / this.levels.length + this.levels.length
    )
  }

  public setProgressWidth(): void {
    this.progressElement.style.width = `${
      this.getProgressWidth() - this.levels.length
    }%`
  }

  public reduceProgressWidth(): void {
    let progressWidth = this.getProgressWidth()
    if (progressWidth === this.levels.length) {
      return
    }
    progressWidth = this.getProgressWidth() - this.levels.length
    this.progressElement.style.width = `${progressWidth}%`
  }

  public checkCompletedLevels(icon: HTMLElement): void {
    this.levels.forEach((level) => {
      if (localStorage.getItem(`level_${level.id}`)) {
        icon.classList.add('completed')
      }
    })
  }

  public removeProgress(): void {
    localStorage.clear()
  }

  public checkCorrectAnswer(value: boolean): void {
    if (!value) {
      this.editorPanel.classList.add('shake')
      return
    }
    this.image.classList.add('image-element')
    setTimeout(() => {
      if (localStorage.length === this.levels.length) {
        this.gameTitle.innerHTML = 'You did it!!!🥹😍🤓'
        this.isAnswerEntered = true
        this.inputArea.value = ''
        alert('You did it!!! Congratulations🥹😍🤓')
      }
      const level = this.getNextLevel()
      if (level) {
        this.saveLevelInfo()
        this.renderLevel(level)
      }
    }, 400)
  }

  public writeAnswerSelector(): void {
    const selector = this.getCurrentLevel().selectors[0].split('')

    selector.forEach((el, idx) => {
      setTimeout(() => (this.inputArea.value += el), idx * 200)
    })
  }

  public clearLevel(): void {
    this.panel.innerHTML = ''
    this.image.innerHTML = ''
    this.title.innerHTML = ''
    this.subtitle.innerHTML = ''
    this.levelsTag.innerHTML = ''
    this.description.innerHTML = ''
    this.examples.innerHTML = ''
    this.gameTitle.innerHTML = ''
    this.inputArea.value = ''
  }
}
