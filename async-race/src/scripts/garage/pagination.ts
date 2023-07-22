import { pagination } from '../ui';
import { updateAllCars } from './car-utils'
import { getCountCar } from './count-cars'

const paginationElem = document.createElement('div');
paginationElem.className = 'nav-pages';
paginationElem.innerHTML = pagination()

const main = document.querySelector('.main') as HTMLElement

main.append(paginationElem);

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

export const countAllPages = async () => {
  const count = await getCountCar()
  const allPages = Math.ceil(count / limitCarOnPage)
   return allPages
}

console.log({prevPageBtn});


prevPageBtn.addEventListener('click', async () => {
  currPage -= 1
  disableButtons()

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

  disableButtons()

  if (7 * currPage > count) {
    nextPageBtn.disabled = true
  }
  updateAllCars(currPage)

  pageNumber.innerHTML = `${currPage}`
})

export default countAllPages
