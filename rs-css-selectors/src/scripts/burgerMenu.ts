import { game } from '../index'

export class BurgerMenu {
  constructor(
    private menuContainer: HTMLElement,
    private menu: HTMLElement,
    private burgerRev: HTMLElement
  ) {}

  public renderMenuLevels(): void {
    game.levels.forEach((level, i) => {
      const element = document.createElement('a')
      const checkLabel = document.createElement('span')
      checkLabel.className = 'fa fa-check'
      element.innerText = level.nameSelectors
      element.append(checkLabel)
      this.menuContainer.append(element)

      element.addEventListener('click', () => {
        game.renderLevel(level)
        game.setCurrentLevelIndex(i)
        this.menu?.classList.remove('open')
        this.burgerRev.classList.remove('show')
      })
    })
  }
}
