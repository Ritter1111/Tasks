import { levels } from './levels'

export function renderLevels() {
  const burger = document.querySelector('.nav-menu') as HTMLElement
  levels.map((level) => {
    const element = document.createElement('a')
    element.innerText = level.nameSelectors
    burger.append(element)
  })
}
