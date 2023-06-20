import { game } from '../index'
import { levels } from './levels'

export class BurgerMenu {
  constructor(
    private menuContainer: HTMLElement,
    private menu: HTMLElement,
    private burgerRev: HTMLElement
  ) {}

  public renderMenuLevels(): void {
    levels.forEach((level) => {
      const element = document.createElement('a')
      const checkLabel = document.createElement('span')
      checkLabel.className = 'fa fa-check'
      element.innerText = level.nameSelectors
      element.append(checkLabel)
      this.menuContainer.append(element)

      element.addEventListener('click', () => {
        game.renderLevel(level)
        this.menu?.classList.remove('open')
        this.burgerRev.classList.remove('show')
      })
    })
  }
}
