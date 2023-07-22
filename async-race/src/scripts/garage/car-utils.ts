import { getCars } from "../api";
import { getCountCar, updateCarsNumber } from "./count-cars";
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
}

export const addDisabledToStart = (id: number) => {
  const startDriveButton = document.querySelector(`.start-drive[data-id="${id}"]`) as HTMLButtonElement;
  if(startDriveButton) {
  startDriveButton.disabled = true;
  startDriveButton.classList.add('disabled');
  }
}

export const addDisabledToStop = (id: number) => {
  const stopDriveButton = document.querySelector(`.stop-drive[data-id="${id}"]`) as HTMLButtonElement;
  if(stopDriveButton){
  stopDriveButton.disabled = true;
  stopDriveButton.classList.add('disabled');
  }
}

export const romoveDisabledToStart = (id: number) => {
  const startDriveButton = document.querySelector(`.start-drive[data-id="${id}"]`) as HTMLButtonElement;
  if(startDriveButton){
  startDriveButton.disabled = false;
  }
}

export const removeDisabledToStop = (id: number) => {
  const stopDriveButton = document.querySelector(`.stop-drive[data-id="${id}"]`) as HTMLButtonElement;
  if(stopDriveButton){
  stopDriveButton.disabled = false;
  stopDriveButton.classList.remove('disabled');
  }
}

export default drawLastCar