import { getCars } from "../api";
import { getCountCar, updateCarsNumber } from "./garage";
import { Car, drawCar } from "../ui";


const drawLastCar = async () => {
  const carss = await getCars(1, 7);

  const lastCar = carss[carss.length - 1];
  if (lastCar) {
    drawCar(lastCar);
  }
  updateCarsNumber()
};

export const disableNextBtn = async () => {
  const nextPageBtn = <HTMLButtonElement>document.querySelector('.next-page')

  const count = await getCountCar()
  // console.log(count)
  if (nextPageBtn){
    if(count > 7) {
      nextPageBtn.disabled = false
    }else {
      nextPageBtn.disabled = true
    }
  }
}

export const updateAllCars = async (page: number) => {
  const wrapCars = document.querySelector('.wrapp-cars')
  if (wrapCars) {
    const allCars = await getCars(page, 7)

    while (wrapCars.firstChild) {
      wrapCars.removeChild(wrapCars.firstChild)
    }

    allCars.forEach((carr) => {
      const newCarElement = Car(carr)
      wrapCars.appendChild(newCarElement)
    })
  }
  updateCarsNumber()
  disableNextBtn()
}

export default drawLastCar