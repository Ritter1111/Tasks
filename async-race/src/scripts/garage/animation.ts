import { startEngine, stopEngine, switchToDriveMode } from "../api";
import { EngineMode, HttpMethod } from "../types/types";

let animationId: number = 0;

function animateCar(car: HTMLElement, flag: HTMLElement, duration: number) {
  const currentPositionCar = car.offsetLeft;
  const distance = Math.abs(car.offsetLeft - flag.offsetLeft) + 55

  let start = 0;
  const framesPerSeconds = 60
  const milisecondsToSeconds = duration / 1000
  const frames = milisecondsToSeconds * framesPerSeconds;
  const distanceX = (distance - currentPositionCar) / frames

  const tick = () => {
    
    start += distanceX
    car.style.transform = `translateX(${start}px)`

    if (start < distance) {
      animationId = requestAnimationFrame(tick)
    }
  }

  tick()
}

const startDrivingCar = async (id: number, car: HTMLElement, flag: HTMLElement) => {
  const { velocity, distance } = await startEngine(id, EngineMode.started, HttpMethod.PATCH);
  const duration = distance / velocity;

  animateCar(car, flag, duration);

  const response = await switchToDriveMode(id, EngineMode.drive, HttpMethod.PATCH);
  console.log(response.success);

  if (!response.success) {
    console.log(animationId);

    cancelAnimationFrame(animationId)
    
  }
}

const stopDrivingCar = async (id: number, car: HTMLElement) => {
  await stopEngine(id, EngineMode.stopped, HttpMethod.PATCH);
  if(animationId !== 0){
  cancelAnimationFrame(animationId)
  }
  car.style.transform = `translateX(${0}px)`
}


document.addEventListener('click', async (e) => {
  const target = e.target as HTMLButtonElement;

  if (target.classList.contains('start-drive')) {
    const { id } = target.dataset
    console.log('gfdgfh')

    const car = document.querySelector(`.car${id}`) as HTMLElement
    const flag = document.querySelector('.flag') as HTMLElement;
    if (id) {
      startDrivingCar(+id, car, flag)
    }
  }
  if (target.classList.contains('stop-drive')) {
    const { id } = target.dataset
    const car = document.querySelector(`.car${id}`) as HTMLElement

    if (id)
      stopDrivingCar(+id, car)
    }
});