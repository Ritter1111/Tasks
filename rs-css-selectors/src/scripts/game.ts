import Level from './level'
import { levels } from './levels'

export default class Game {
  private panel: Element
  private levels: Level[]
  private image: Element
  private title: Element
  private subtitle: Element
  private levelsTag: Element
  private description: Element
  private examples: Element

  constructor() {
    this.panel = document.querySelector('.html-right_body') as Element
    this.image = document.querySelector('.person') as Element
    this.title = document.querySelector('.levels_title') as Element
    this.subtitle = document.querySelector('.levels_subtitle') as Element
    this.levelsTag = document.querySelector('.levels_type_tag') as Element
    this.description = document.querySelector('.levels_description') as Element
    this.examples = document.querySelector('.levels_example_text') as Element
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

  public initGame(): void {
    this.renderLevel(this.levels[0])
  }

  public renderLevel(level: Level) {
    this.panel.innerHTML = ''
    this.image.innerHTML = ''
    this.title.innerHTML = ''
    this.subtitle.innerHTML = ''
    this.levelsTag.innerHTML = ''
    this.description.innerHTML = ''
    this.examples.innerHTML = ''

    const panel = document.createElement('pre')
    panel.innerText = level.code
    this.panel.append(panel)

    this.image.innerHTML = level.code

    this.title.append(level.title)
    this.subtitle.append(level.subtitle)
    this.levelsTag.append(level.nameSelectors)
    this.description.innerHTML = level.description

    level.examples.forEach((el) => {
      this.examples.innerHTML = el
    })
  }
}
