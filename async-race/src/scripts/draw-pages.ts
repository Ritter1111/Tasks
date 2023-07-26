import { getCars } from "./api";
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
import { winnersPage } from "./winners/draw-winners";
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
  await updataCountWinners()
})()

export default drawEveryCar