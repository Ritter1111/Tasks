import { createCar } from "../api";
import carMarks from "../cars/marks";
import carModels from "../cars/models";
import { DataCar, HttpMethod, NewCar } from "../types/types";
import { updateAllCars } from "./car-utils";
import { updateCarsNumber } from "./garage";

const getRandomCar = () => {
  const randomCar = Math.floor(Math.random() * carMarks.length)
  const randomModel = Math.floor(Math.random() * carModels.length)
  const fullNameCar = `${carMarks[randomCar]} ${carModels[randomModel]}`
  return fullNameCar
}

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const generateNewCarData = (): NewCar => ({
  name: getRandomCar(),
  color: generateRandomColor()
})

const generateOneHundredCars = async (): Promise<NewCar[]> => {
  const allCars = 100;
  const result: Promise<DataCar>[] = []
  for (let i = 0; i < allCars; i += 1) {
    result.push(createCar(generateNewCarData(), HttpMethod.POST))
  }
  return Promise.all(result)
}


function generateCars() {
  const generateCarsBtn = <HTMLElement>document.querySelector('.generate-cars');

  if (generateCarsBtn) {
    generateCarsBtn.addEventListener('click', async () => {
      await generateOneHundredCars()
      updateAllCars()
      updateCarsNumber()
    });
  }
}
export default generateCars
