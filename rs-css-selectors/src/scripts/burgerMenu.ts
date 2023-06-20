import { game } from '../index'
import { levels } from './levels'

export class BurgerMenu {
  constructor(private menuContainer: HTMLElement) {}

  public renderMenuLevels(): void {
    levels.forEach((level) => {
      const element = document.createElement('a')
      element.innerText = level.nameSelectors
      this.menuContainer.append(element)

      element.addEventListener('click', () => {
        game.renderLevel(level)
      })
    })
  }
}
