import { createCar } from "../api";
import { HttpMethod } from "../types/types";
import  { disableNextBtn, updateAllCars } from "./car-utils";

function createCarListener() {
  const createCarBtn = <HTMLElement>document.querySelector('.btn-create');
  const getinputValue = <HTMLInputElement>document.querySelector('.create_input');
  const getColorValue = <HTMLInputElement>document.querySelector('.create_color');

  createCarBtn.addEventListener('click', async () => {
    const inputValue = getinputValue.value
    const colorValue = getColorValue.value

    if (!inputValue) {
      return;
    }

    await createCar({ name: inputValue, color: colorValue }, HttpMethod.POST)
    updateAllCars(1)
    disableNextBtn()
    
    getinputValue.value = '';
    getColorValue.value = '';
  });
}

export default createCarListener