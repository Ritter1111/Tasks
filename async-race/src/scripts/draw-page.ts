import { getCars } from "./api";
import { updateCarsNumber } from "./garage/garage";
import { drawCar, 
  createHeader, 
  createMainSection, 
  drawGarageHeader, 
  pagination, 
  winnersPage } from "./ui";

const header = document.createElement('header');
header.innerHTML = createHeader()

const main = document.createElement('main')
main.className = 'main'

const paginationElem = document.createElement('div');
paginationElem.className = 'nav-pages';
paginationElem.innerHTML = pagination()
main.append(paginationElem)

document.body.append(header, main)

let carsRendered = false;

export const drawEveryCar = async () => {
  const allCars = await getCars(1, 7)

  allCars.forEach((carr) => {
    drawCar(carr)
  })
}

// let currentPage = 1;

const goToTheGaragePage = async () => {
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

// export const drawGarage = async () => {
//   const wrapCars = document.querySelector('.wrapp-cars');
//   if(wrapCars){
//     wrapCars.innerHTML = '';
//   }

//   const allCars = await getCars(1, 7)

//   allCars.forEach((carr) => {
//     drawCar(carr)
//   })
// }

export const drawLastCar = async () => {
  const carss = await getCars(1, 7);

  const lastCar = carss[carss.length - 1];
  if (lastCar) {
    drawCar(lastCar);
  }
  updateCarsNumber()
};

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
    main.append(paginationElem);
  };
  
  const garageButton = <HTMLElement>document.querySelector('.garage');
  garageButton.addEventListener('click', navigateToGaragePage);
})()

document.addEventListener('DOMContentLoaded', async () => {
  main.innerHTML = createMainSection() + drawGarageHeader()

  drawEveryCar()
})

export default drawEveryCar