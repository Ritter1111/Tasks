// import CodeMirror from 'codemirror'
import Level from './level'
import { levels } from './levels'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
// import 'codemirror/mode/css/css'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/monokai.css'
// import 'codemirror/addon/display/autorefresh'

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

    this.indexLevel = 0
    this.levels = levels.map(
      (level) =>
        new Level(
          level.id,
          level.title,
          level.subtitle,
          level.description,
          level.selectors,
          level.nameSelectors,
          level.examples,
          level.code
        )
    )
  }

  initGame = () => {
    const storedLevel = localStorage.getItem('currentLevel')
    if (storedLevel) {
      this.indexLevel = +storedLevel
    }

    this.checkCompletedLevels(this.facheck)
    this.renderLevel(this.levels[this.indexLevel])

    const angleRight = document.querySelector('.fa-angle-right') as HTMLElement
    angleRight.addEventListener('click', this.moveToNextLevel.bind(this))

    const angleLeft = document.querySelector('.fa-angle-left') as HTMLElement
    angleLeft.addEventListener('click', this.moveToPreviousLevel.bind(this))

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const isAnserCorrect = this.getCurrentLevel().checkAnswer(
          (event.target as HTMLInputElement).value
        )
        if (!isAnserCorrect) {
          console.error('Answer is incorrect')
          this.editorPanel.classList.add('shake')
          return
        }
        const level = this.getNextLevel()
        if (level) {
          this.saveLevelInfo()
          this.renderLevel(level)
        }
      }
    })

    // document.addEventListener('keyup', () => {
    //   this.buttonSubmit.classList.remove('clicked')
    // })

    document.addEventListener('animationend', () => {
      this.editorPanel.classList.remove('shake')
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
        this.inputArea.value
      )
      if (!isAnserCorrect) {
        this.editorPanel.classList.add('shake')
        return
      }
      const level = this.getNextLevel()
      if (level) {
        this.saveLevelInfo()
        this.renderLevel(level)
      }
    })
  }

  public renderLevel(level: Level) {
    this.panel.innerHTML = ''
    this.image.innerHTML = ''
    this.title.innerHTML = ''
    this.subtitle.innerHTML = ''
    this.levelsTag.innerHTML = ''
    this.description.innerHTML = ''
    this.examples.innerHTML = ''
    this.gameTitle.innerHTML = ''
    this.inputArea.value = ''
    this.setProgressWidth()

    const panel = document.createElement('pre')
    panel.textContent = level.code
    if (localStorage.getItem(`level_${level.id}`)) {
      this.facheck.classList.add('completed')
    } else {
      this.facheck.classList.remove('completed')
    }
    this.panel.append(panel)

    hljs.highlightElement(panel)

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
}
