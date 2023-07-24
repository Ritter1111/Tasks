import { getCar, getCars, getWinners } from "./api";
import { disableNextBtn } from "./garage/car-utils";
import createCarListener from "./garage/create-car";
import generateCars from "./garage/generate-cars";
import updateCarListener from "./garage/update-car";
import {
  drawCar,
  createHeader,
  createMainSection,
  drawGarageHeader,
} from "./ui";
import { winnersPage, contentWinners } from "./winners/draw-winners";
import { updataCountWinners } from "./winners/count-winners";

const header = document.createElement('header');
header.innerHTML = createHeader()

const main = document.createElement('main')
main.className = 'main'

document.body.append(header, main)

let carsRendered = false;

export const drawEveryCar = async () => {
  const allCars = await getCars(1, 7)

  allCars.forEach((carr) => {
    drawCar(carr)
  })
  await disableNextBtn()
}

export const drawWinners = async () => {
  const winners = await getWinners(1, 10, 'dfj', 'order')
  const winnerTable = document.querySelector('.winner-table') as HTMLElement
  winnerTable.innerHTML = ""

  winners.forEach(async (item) => {
   const car = await getCar(item.id)
  const wrapperWinner = document.createElement('tr')
  wrapperWinner.innerHTML = contentWinners(item, car.color, car.name)
  winnerTable.append(wrapperWinner)
  })
}

export const goToTheGaragePage = async () => {
  const allCars = await getCars(1, 7)

  allCars.forEach((carr) => {
    drawCar(carr)
  })
  const wrapCars = document.querySelector('.wrapp-cars')
  if (wrapCars && !carsRendered) {
    wrapCars.innerHTML = '';

    allCars.forEach((carr) => {
      drawCar(carr);
    });

    carsRendered = false;
  }
}

 (async function createMainPage() {
  main.innerHTML = createMainSection() + drawGarageHeader()
  
  createCarListener();
  updateCarListener()
  await drawEveryCar()
  generateCars()
  winnersPage()
  await drawWinners()
  await updataCountWinners()
})()

export default drawEveryCar