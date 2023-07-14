import {drawCar,  createMainSection } from "../ui";
import { getCar, updateCar } from "../api";
import { HttpMethod } from "../types/types";

document.addEventListener('DOMContentLoaded', async () => {
  const getinputValue = <HTMLInputElement>document.querySelector('.update_input');
  const getColorValue = <HTMLInputElement>document.querySelector('.update-color');
  const updateBtn = <HTMLInputElement>document.querySelector('.btn-update');
  let idCar: number;

    document.addEventListener('click', async (e) => {
    const updateCarBtn = e.target as HTMLButtonElement;
    if (updateCarBtn.classList.contains('select')) {
    createMainSection()

      const { id, name, color } = updateCarBtn.dataset
      idCar = Number(id)

      if (name !== undefined && color !== undefined) {
        getinputValue.value = name;
        getColorValue.value = color
      }
    }
  });

  updateBtn.addEventListener('click', async () => {
    const updateInputValue = getinputValue.value
    const updateColorValue = getColorValue.value

    if (idCar)
    await updateCar(idCar, {name: updateInputValue, color: updateColorValue}, HttpMethod.PUT)
    const care = await getCar(idCar);
    drawCar(care);
    console.log(care)
    getinputValue.value = '';
    getColorValue.value = '';
  })
})