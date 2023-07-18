import { getCountCars } from "../api";

let length:number = 0

export async function updateCarsNumber() {
  const result = await getCountCars(1, 7);
  length = result;

  const carsNumber = document.querySelector('.count-cars');
  if (carsNumber) {
    carsNumber.textContent = `${length}`;
  }
}

export const getCountCar = async (): Promise<number> => {
  const result = await getCountCars(1, 7);
  length = result;
  return length 
}
console.log( getCountCar());


export default
updateCarsNumber();