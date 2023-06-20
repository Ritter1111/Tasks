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
  private gameTitle: Element
  private indexLevel: number
  private level: Element

  constructor() {
    this.panel = document.querySelector('.panel-right') as Element
    this.image = document.querySelector('.person') as Element
    this.title = document.querySelector('.levels_title') as Element
    this.subtitle = document.querySelector('.levels_subtitle') as Element
    this.levelsTag = document.querySelector('.levels_type_tag') as Element
    this.description = document.querySelector('.levels_description') as Element
    this.examples = document.querySelector('.levels_example_text') as Element
    this.gameTitle = document.querySelector('.game_title') as Element
    this.level = document.querySelector('.sidebar-lvl_header__text') as Element
    this.indexLevel = 0
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
    this.addClickAngle()
  }

  public renderLevel(level: Level) {
    this.panel.innerHTML = ''
    this.image.innerHTML = ''
    this.title.innerHTML = ''
    this.subtitle.innerHTML = ''
    this.levelsTag.innerHTML = ''
    this.description.innerHTML = ''
    this.examples.innerHTML = ''
    this.gameTitle.innerHTML = ''

    const panel = document.createElement('pre')
    panel.innerText = level.code
    this.panel.append(panel)

    this.image.innerHTML = level.code
    this.level.innerHTML = `Level ${level.id} of 10`

    const nodes = document.querySelectorAll(
      '.person ' + level.selectors[0]
    ) as NodeListOf<HTMLElement>

    nodes.forEach((node) => {
      node.classList.add('animated')
    })

    this.title.append(level.title)
    this.gameTitle.append(level.subtitle)
    this.subtitle.append(level.subtitle)
    this.levelsTag.append(level.nameSelectors)
    this.description.innerHTML = level.description

    level.examples.forEach((el) => {
      this.examples.innerHTML = el
    })
  }

  public addClickAngle(): void {
    const angleRight = document.querySelector('.fa-angle-right') as HTMLElement
    const angleLeft = document.querySelector('.fa-angle-left') as HTMLElement
    angleRight.addEventListener('click', () => {
      if (this.indexLevel < levels.length - 1) {
        this.indexLevel++
        this.renderLevel(levels[this.indexLevel])
      }
    })

    angleLeft.addEventListener('click', () => {
      if (this.indexLevel > 0) {
        this.indexLevel--
        this.renderLevel(levels[this.indexLevel])
      }
    })
  }
}
