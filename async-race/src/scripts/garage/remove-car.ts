import { removeCar } from "../api";
import { HttpMethod } from "../types/types";
import { updateAllCars } from "./car-utils";
import { updateCarsNumber } from "./count-cars";

document.addEventListener('click', async (e) => {
  const removeCarBtn = e.target as HTMLButtonElement;
  if (removeCarBtn.classList.contains('remove-car')) {
    const carWrapper = removeCarBtn.closest('.car_wrapper') as HTMLElement;
    const { id } = removeCarBtn.dataset

    await removeCar(Number(id), HttpMethod.DELETE);
    carWrapper.remove();
    updateCarsNumber()
    updateAllCars(1)
  }
});