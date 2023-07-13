import { removeCar } from "../api";
import { HttpMethod } from "../types/types";

document.addEventListener('DOMContentLoaded', async () => {
  document.addEventListener('click', async (e) => {
    const removeCarBtn = e.target as HTMLButtonElement;
    if (removeCarBtn.classList.contains('remove-car')) {
      const carWrapper = removeCarBtn.closest('.car_wrapper') as HTMLElement;
      const {id} = removeCarBtn.dataset

        await removeCar(Number(id), HttpMethod.DELETE);
        carWrapper.remove();
    }
  });
})