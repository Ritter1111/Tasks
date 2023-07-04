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
      element.className = 'item-level'
      const checkLabel = document.createElement('span')
      checkLabel.className = 'fa fa-check'
      element.innerText = level.nameSelectors
      element.append(checkLabel)
      this.menuContainer.append(element)

      if (localStorage.getItem(`level_${level.id}`)) {
        checkLabel.classList.add('completed')
      } else if (localStorage.getItem(`level_${level.id}_hint`)) {
        checkLabel.classList.add('completed-help')
      }
      this.addHighliteToCurrentLevel()

      element.addEventListener('click', () => {
        game.renderLevel(level)
        game.setCurrentLevelIndex(i)
        game.saveLevelInfo()
        game.setProgressWidth()
        this.addHighliteToCurrentLevel()
        this.closeBurger()
      })
    })
  }

  public closeBurger(): void {
    this.menu?.classList.remove('open')
    this.burgerRev.classList.remove('show')
  }

  public addHighliteToCurrentLevel(): void {
    const levelElements =
      this.menuContainer.getElementsByClassName('item-level')
    Array.from(levelElements).forEach((element, index) => {
      if (index === +game.getCurrentLevel().id - 1) {
        element.classList.add('selected')
      } else {
        element.classList.remove('selected')
      }
    })
  }

  public resetButton(): void {
    const resetProgress = document.querySelector(
      '.levels-wrapper_reset'
    ) as HTMLElement

    resetProgress.addEventListener('click', () => {
      game.removeProgress()
      game.setCurrentLevelIndex(0)
      game.setProgressWidth()
      game.renderLevel(game.levels[0])
      this.closeBurger()
    })
  }
}
