import { getCars } from "./api";
// import startDriving from "./garage/animation";
import { disableNextBtn } from "./garage/car-utils";
import createCarListener from "./garage/create-car";
// import { updateCarsNumber } from "./garage/garage";
import generateCars from "./garage/generate-cars";
import updateCarListener from "./garage/update-car";
import {
  drawCar,
  createHeader,
  createMainSection,
  drawGarageHeader,
  pagination,
  winnersPage,
} from "./ui";

const header = document.createElement('header');
header.innerHTML = createHeader()

const main = document.createElement('main')
main.className = 'main'

const paginationElem = document.createElement('div');
paginationElem.className = 'nav-pages';
paginationElem.innerHTML = pagination()

document.body.append(header, main)

let carsRendered = false;

export const drawEveryCar = async () => {
  const allCars = await getCars(1, 7)

  allCars.forEach((carr) => {
    drawCar(carr)
  })
  disableNextBtn()

}

// let currentPage = 1;

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

function navToWinnersPage(winn: HTMLElement) {
  const winnersButton = <HTMLElement>document.querySelector('.winners');
  winnersButton.addEventListener('click', () => {
    winn.style.display = 'block'
    main.style.display = 'none'

  });
}

function navToGarage(winn: HTMLElement) {
  const garageButton = <HTMLElement>document.querySelector('.garage');
  garageButton.addEventListener('click', () => {
    main.style.display = 'block'
    winn.style.display = 'none'
  });
}

(function createMainPage() {
  main.innerHTML = createMainSection() + drawGarageHeader()
  const winnersSection = document.createElement('section')
  winnersSection.innerHTML = winnersPage()
  document.body.append(winnersSection)
  
  createCarListener();
  updateCarListener()
  drawEveryCar()
  generateCars()
  main.append(paginationElem);
  
  const winPage = <HTMLElement>document.querySelector('.winners-page') as HTMLElement;
  winPage.style.display = 'none'

  navToWinnersPage(winPage)
  navToGarage(winPage)
})()


export default drawEveryCar