export function highlightTableElements(
  element: Element,
  targetElement: Element,
  target: HTMLElement,
  tooltip: HTMLElement
): void {
  const elemTable = Array.prototype.slice.call(element.querySelectorAll('*'))
  const elemCode = Array.prototype.slice.call(
    targetElement.querySelectorAll('div')
  )
  const index = elemCode.indexOf(target)
  if (index !== -1 && index < elemCode.length) {
    elemTable[index].classList.add('hovered')
    tooltip.innerText = elemCode[index].textContent
    calculatePositionTooltip(elemTable[index], tooltip)
  }
}

export function highlightCodeElements(
  element: Element,
  targetElement: Element,
  target: HTMLElement,
  tooltip: HTMLElement
): void {
  const elemTable = Array.prototype.slice.call(element.querySelectorAll('*'))
  const elemCode = Array.prototype.slice.call(
    targetElement.querySelectorAll('div')
  )
  const index = elemTable.indexOf(target)
  if (index !== -1 && index < elemCode.length) {
    elemCode[index].classList.add('hovered-code')
    tooltip.innerText = elemCode[index].textContent
    calculatePositionTooltip(target, tooltip)
  }
}

export function removehighlightTableElements(
  element: Element,
  targetElement: Element,
  target: HTMLElement,
  tooltip: HTMLElement
): void {
  const elemTable = Array.prototype.slice.call(element.querySelectorAll('*'))
  const elemCode = Array.prototype.slice.call(
    targetElement.querySelectorAll('div')
  )
  const index = elemCode.indexOf(target)
  if (index !== -1 && index < elemCode.length) {
    elemTable[index].classList.remove('hovered')
    tooltip.style.visibility = 'hidden'
  }
}

export function removehighlightCodeElements(
  element: Element,
  targetElement: Element,
  target: HTMLElement,
  tooltip: HTMLElement
): void {
  const elemTable = Array.prototype.slice.call(element.querySelectorAll('*'))
  const elemCode = Array.prototype.slice.call(
    targetElement.querySelectorAll('div')
  )
  const index = elemTable.indexOf(target)
  if (index !== -1 && index < elemCode.length) {
    elemCode[index].classList.remove('hovered-code')
    tooltip.style.visibility = 'hidden'
  }
}

function calculatePositionTooltip(currElem: HTMLElement, tooltip: HTMLElement) {
  tooltip.style.visibility = 'visible'
  tooltip.style.left = `${currElem.offsetLeft}px`
  tooltip.style.top = `${currElem.offsetTop + currElem.offsetHeight}px`
}
