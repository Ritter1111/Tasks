import { levels } from './levels'

export default class burgerView {
  public burger: HTMLElement | null
  public menu: HTMLElement | null

  constructor() {
    this.burger = document.querySelector('.burger')
    this.menu = document.querySelector('.nav-menu')
  }

  public init(): void {
    this.burger?.addEventListener('click', () => {
      this.menu?.classList.toggle('open')
    })
    this.renderLevels()
  }

  public renderLevels(): void {
    const burger = document.querySelector('.nav-menu') as HTMLElement
    levels.map((level) => {
      const element = document.createElement('a')
      element.innerText = level.nameSelectors
      burger.append(element)
    })
  }
}
