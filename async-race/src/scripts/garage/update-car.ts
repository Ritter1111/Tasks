import { Car, createMainSection } from "../ui";
import { getCar, updateCar } from "../api";
import { HttpMethod } from "../types/types";

function updateCarListener() {
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
      await updateCar(idCar, { name: updateInputValue, color: updateColorValue }, HttpMethod.PUT)
    const blockCar = document.querySelector(`.generated-car[data-id="${idCar}"]`);

    const updatedCar = await getCar(idCar);
    if (blockCar && blockCar.parentNode) {
      const parentElem = blockCar.parentNode
      const newCarElement = Car(updatedCar)

      parentElem.replaceChild(newCarElement, blockCar);
    }
    getinputValue.value = '';
    getColorValue.value = '';
  })

}

export default updateCarListener