import { BurgerMenu } from './burgerMenu'

export default class burgerView {
  public burger: HTMLElement
  public burgerRev: HTMLElement
  public menu: HTMLElement
  public burgerMenu: BurgerMenu

  constructor() {
    this.burger = document.querySelector('.burger') as HTMLElement
    this.burgerRev = document.querySelector('.burger-reverse') as HTMLElement
    this.menu = document.querySelector('.nav-menu') as HTMLElement
    this.burgerMenu = new BurgerMenu(this.menu)
  }

  public init(): void {
    this.burger?.addEventListener('click', () => {
      this.menu?.classList.toggle('open')
      this.burgerRev.classList.toggle('show')
    })
    this.burgerMenu.renderMenuLevels()
  }

  // public renderLevels(): void {
  //   const burger = document.querySelector('.nav-menu') as HTMLElement
  //   levels.map((level) => {
  //     const element = document.createElement('a')
  //     element.innerText = level.nameSelectors
  //     burger.append(element)
  //   })
  // }

  // public addClickHendler(): void {
  //   const levelElements = document.querySelectorAll('.nav-menu a') as NodeList
  //   levelElements.forEach((el, idx) => {
  //     el.addEventListener('click', () => {
  //       game.renderLevel(levels[idx])
  //     })
  //   })
  // }
}
