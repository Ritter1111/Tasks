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

      if (localStorage.getItem(`level_${level.id}`)) {
        checkLabel.classList.add('completed')
      }

      element.addEventListener('click', () => {
        game.renderLevel(level)
        game.setCurrentLevelIndex(i)
        game.saveLevelInfo()
        game.setProgressWidth()
        this.closeBurger()
      })

      const resetProgress = document.querySelector(
        '.levels-wrapper_reset'
      ) as HTMLElement

      resetProgress.addEventListener('click', () => {
        game.removeProgress()
        game.renderLevel(game.levels[0])
        this.closeBurger()
      })
    })
  }

  public closeBurger(): void {
    this.menu?.classList.remove('open')
    this.burgerRev.classList.remove('show')
  }
}
