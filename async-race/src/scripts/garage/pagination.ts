import { getCars } from '../api'
import { Car } from '../ui'
import { getCountCar } from './garage'

const prevPageBtn = <HTMLButtonElement>document.querySelector('.previous-page')
const nextPageBtn = <HTMLButtonElement>document.querySelector('.next-page')
const pageNumber = <HTMLElement>document.querySelector('.page-number')

let currPage = 1

function disableButtons() {
  if (currPage > 1) {
    prevPageBtn.disabled = false
    nextPageBtn.disabled = false
  } else {
    prevPageBtn.disabled = true
    nextPageBtn.disabled = true
  }
}

export async function renderAllCars() {
  const wrapCars = document.querySelector('.wrapp-cars')
  if (wrapCars) {
    const allCars = await getCars(currPage, 7)

    while (wrapCars.firstChild) {
      wrapCars.removeChild(wrapCars.firstChild)
    }

    allCars.forEach((carr) => {
      const newCarElement = Car(carr)
      wrapCars.appendChild(newCarElement)
    })
  }
}

prevPageBtn.addEventListener('click', async () => {
  currPage -= 1
  disableButtons()
  renderAllCars()
  pageNumber.innerHTML = `${currPage}`

})

nextPageBtn.addEventListener('click', async () => {
  currPage += 1
  const count = await getCountCar()

  disableButtons()
  renderAllCars()
  if (7 * currPage > count) {
    nextPageBtn.disabled = true
  }
  pageNumber.innerHTML = `${currPage}`
})

export default renderAllCars
