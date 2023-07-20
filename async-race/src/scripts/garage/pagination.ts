// import { getCars } from '../api'
// import { Car } from '../ui'
import { updateAllCars } from './car-utils'
import { getCountCar } from './garage'

const prevPageBtn = <HTMLButtonElement>document.querySelector('.previous-page')
const nextPageBtn = <HTMLButtonElement>document.querySelector('.next-page')
const pageNumber = <HTMLElement>document.querySelector('.page-number')

let currPage = 1
const limitCarOnPage = 7

export function currentPage() {
  return currPage
}

function disableButtons() {
  if (currPage > 1) {
    prevPageBtn.disabled = false
    nextPageBtn.disabled = false
  } else {
    prevPageBtn.disabled = true
  }
}

// export async function renderAllCars() {
//   const wrapCars = document.querySelector('.wrapp-cars')
//   if (wrapCars) {
//     const allCars = await getCars(currPage, limitCarOnPage)

//     while (wrapCars.firstChild) {
//       wrapCars.removeChild(wrapCars.firstChild)
//     }

//     allCars.forEach((carr) => {
//       const newCarElement = Car(carr)
//       wrapCars.appendChild(newCarElement)
//     })
//   }
// }
export const countAllPages = async () => {
  const count = await getCountCar()
  const allPages = Math.ceil(count / limitCarOnPage)
   return allPages
}

prevPageBtn.addEventListener('click', async () => {
  currPage -= 1
  disableButtons()
  // renderAllCars()
   const countPages = await countAllPages()
  if(countPages > 1){
    nextPageBtn.disabled = false
  }
  updateAllCars(currPage)
  pageNumber.innerHTML = `${currPage}`

})

nextPageBtn.addEventListener('click', async () => {
  currPage += 1
  const count = await getCountCar()
  // const countPages = await countAllPages()
  // if(countPages > 1){
  //   nextPageBtn.disabled = false
  // }
  // else 
  disableButtons()

  if (7 * currPage > count) {
    nextPageBtn.disabled = true
  }
  updateAllCars(currPage)

  // renderAllCars()

  pageNumber.innerHTML = `${currPage}`
})

export default countAllPages
