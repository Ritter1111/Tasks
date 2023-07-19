import { getCars } from "./api";
import { disableNextBtn } from "./garage/car-utils";
import createCarListener from "./garage/create-car";
import { updateCarsNumber } from "./garage/garage";
import generateCars from "./garage/generate-cars";
import updateCarListener from "./garage/update-car";
import {
  drawCar,
  createHeader,
  createMainSection,
  drawGarageHeader,
  pagination,
  winnersPage
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

(function navToWinnersPage() {
  const navigateToWinnersPage = () => {
    main.innerHTML = winnersPage();
    main.append(paginationElem);
  };

  const winnersButton = <HTMLElement>document.querySelector('.winners');
  winnersButton.addEventListener('click', navigateToWinnersPage);
})();

(function navToGarage() {
  const navigateToGaragePage = () => {
    main.innerHTML = createMainSection() + drawGarageHeader()
    goToTheGaragePage()
    createCarListener()
    updateCarListener()
    updateCarsNumber()
    main.append(paginationElem);
  };

  const garageButton = <HTMLElement>document.querySelector('.garage');
  garageButton.addEventListener('click', navigateToGaragePage);
})()

main.innerHTML = createMainSection() + drawGarageHeader()

createCarListener();
updateCarListener()
drawEveryCar()
generateCars()

main.append(paginationElem);

export default drawEveryCar