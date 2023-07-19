import { getCars } from "../api";
import { updateCarsNumber } from "./garage";
import { Car, drawCar } from "../ui";

const drawLastCar = async () => {
  const carss = await getCars(1, 7);

  const lastCar = carss[carss.length - 1];
  if (lastCar) {
    drawCar(lastCar);
  }
  updateCarsNumber()
};

export const updateAllCars = async () => {
  const wrapCars = document.querySelector('.wrapp-cars')
  if (wrapCars) {
    const allCars = await getCars(1, 7)

    while (wrapCars.firstChild) {
      wrapCars.removeChild(wrapCars.firstChild)
    }

    allCars.forEach((carr) => {
      const newCarElement = Car(carr)
      wrapCars.appendChild(newCarElement)
    })
  }
}

export default drawLastCar