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
  if (index !== -1) {
    console.log(elemCode[index].textContent)
    elemTable[index].classList.add('hovered')
    tooltip.innerText = elemCode[index].textContent
    tooltip.style.visibility = 'visible'
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
  if (index !== -1) {
    elemCode[index].classList.add('hovered')
    tooltip.innerText = elemCode[index].textContent
    tooltip.style.visibility = 'visible'
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
  if (index !== -1) {
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
  if (index !== -1) {
    elemCode[index].classList.remove('hovered')
    tooltip.style.visibility = 'hidden'
  }
}
