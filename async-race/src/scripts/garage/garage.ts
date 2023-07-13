import { getCountCars } from "../api";

let length = 0

async function updateCarsNumber() {
  const result = await getCountCars(1, 7);
  length = result;

  const carsNumber = document.querySelector('.count-cars');
  if (carsNumber)
    carsNumber.textContent = `${length}`;
}

updateCarsNumber();