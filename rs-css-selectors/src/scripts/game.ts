import Level from './level'
import { levels } from './levels'

export default class Game {
  private panel: Element
  private levels: Level[]
  private image: Element

  constructor() {
    this.panel = document.querySelector('.html-right_body') as Element
    this.image = document.querySelector('.person') as Element
    this.levels = levels.map(
      (level) =>
        new Level(
          level.id,
          level.title,
          level.description,
          level.selectors,
          level.nameSelectors,
          level.examples,
          level.code
        )
    )
  }

  public initGame() {
    this.renderLevel(this.levels[0])
  }

  public renderLevel(level: Level) {
    const panel = document.createElement('pre')
    panel.innerText = level.code
    this.panel.append(panel)

    // level.selectors.forEach((selector) => {
    //   const character = document.createElement('div')
    //   character.className = selector
    //   this.image.append(character)
    // })
    this.image.innerHTML = level.code

    // this.image.className = level.selectors.join(' ')
  }
}
