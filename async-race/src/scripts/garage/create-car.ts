import { createCar } from "../api";
import { HttpMethod } from "../types/types";
import { drawLastCar } from "../draw-page";

document.addEventListener('DOMContentLoaded', async () => {

const createCarBtn = <HTMLElement>document.querySelector('.btn-create');
const getinputValue = <HTMLInputElement>document.querySelector('.create_input');
const getColorValue = <HTMLInputElement>document.querySelector('.create_color');

  createCarBtn.addEventListener('click', async () => {
    const inputValue = getinputValue.value
    const colorValue = getColorValue.value

    await createCar({name: inputValue, color: colorValue}, HttpMethod.POST)
    drawLastCar()

    getinputValue.value = '';
    getColorValue.value = '';
  });
})