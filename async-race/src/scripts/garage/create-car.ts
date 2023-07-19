import { createCar } from "../api";
import { HttpMethod } from "../types/types";
import  { updateAllCars } from "./car-utils";
import { getCountCar } from "./garage";

function createCarListener() {
  const createCarBtn = <HTMLElement>document.querySelector('.btn-create');
  const getinputValue = <HTMLInputElement>document.querySelector('.create_input');
  const getColorValue = <HTMLInputElement>document.querySelector('.create_color');

  createCarBtn.addEventListener('click', async () => {
    const inputValue = getinputValue.value
    const colorValue = getColorValue.value

    await createCar({ name: inputValue, color: colorValue }, HttpMethod.POST)
    updateAllCars(1)
    const nextPageBtn = <HTMLButtonElement>document.querySelector('.next-page')

    const count = await getCountCar()
    // console.log(count)
    if (nextPageBtn){
      if(count > 7) {
        nextPageBtn.disabled = false
      }
    }

    getinputValue.value = '';
    getColorValue.value = '';
  });
}

export default createCarListener