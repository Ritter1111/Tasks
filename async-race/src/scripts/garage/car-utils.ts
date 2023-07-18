import { getCars } from "../api";
import { updateCarsNumber } from "./garage";
import { drawCar } from "../ui";

const drawLastCar = async () => {
  const carss = await getCars(1, 7);

  const lastCar = carss[carss.length - 1];
  if (lastCar) {
    drawCar(lastCar);
  }
  updateCarsNumber()
};
export default drawLastCar