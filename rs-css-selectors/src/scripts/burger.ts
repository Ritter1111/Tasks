import Game from './game'
import { levels } from './levels'

export default class burgerView {
  public burger: HTMLElement | null
  public menu: HTMLElement | null
  public game: Game

  constructor() {
    this.burger = document.querySelector('.burger')
    this.menu = document.querySelector('.nav-menu')
    this.game = new Game()
  }

  public init(): void {
    this.burger?.addEventListener('click', () => {
      this.menu?.classList.toggle('open')
    })
    this.renderLevels()
    this.addClickHendler()
  }

  public renderLevels(): void {
    const burger = document.querySelector('.nav-menu') as HTMLElement
    levels.map((level) => {
      const element = document.createElement('a')
      element.innerText = level.nameSelectors
      burger.append(element)
    })
  }

  public addClickHendler(): void {
    const levelElements = document.querySelectorAll('.nav-menu a')
    levelElements.forEach((el, idx) => {
      el.addEventListener('click', () => {
        this.game.renderLevel(levels[idx])
      })
    })
  }
}
