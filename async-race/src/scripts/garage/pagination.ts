import { getCars } from '../api'
import { Car } from '../ui'
import { getCountCar } from './garage'

const prevPageBtn = <HTMLButtonElement>document.querySelector('.previous-page')
const nextPageBtn = <HTMLButtonElement>document.querySelector('.next-page')
let currPage = 1

function disableButtons() {
  if (currPage > 1) {
    prevPageBtn.disabled = false
  } else {
    prevPageBtn.disabled = true
  }
}

prevPageBtn.addEventListener('click', async () => {
  currPage -= 1
  disableButtons()
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
})

nextPageBtn.addEventListener('click', async () => {
  currPage += 1
  const count = await getCountCar()

  console.log(count)
  // if(count > 7) {
  //   nextPageBtn.disabled = false
  // }

  disableButtons()
  if (7 * currPage > count) {
    nextPageBtn.disabled = true
  }
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
})
