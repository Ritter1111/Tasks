import { getCars, startEngine, stopEngine, switchToDriveMode } from "../api";
import { EngineMode, HttpMethod } from "../types/types";
import { currentPage } from "./pagination";

let animationId: number = 0;

function animateCar(car: HTMLElement, flag: HTMLElement, duration: number) {
  const currentPositionCar = car.offsetLeft;
  const distance = Math.abs(car.offsetLeft - flag.offsetLeft) + 55
  let start = 0;
  const framesPerSeconds = 60
  const milisecondsToSeconds = duration / 1000
  const frames = milisecondsToSeconds * framesPerSeconds;
  const distanceX = (distance - currentPositionCar) / frames

  const tickAnimate = () => {
    start += distanceX
    car.style.transform = `translateX(${start}px)`

    if (start < distance) {
      animationId = requestAnimationFrame(tickAnimate)
    }
  }
  tickAnimate()
}

const startDrivingCar = async (id: number, car: HTMLElement, flag: HTMLElement) => {
  const { velocity, distance } = await startEngine(id, EngineMode.started, HttpMethod.PATCH);
  const duration = distance / velocity;

  animateCar(car, flag, duration);

  const response = await switchToDriveMode(id, EngineMode.drive, HttpMethod.PATCH);

  if (!response.success) {
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

const startRace = async () => {
  const cars = await getCars(currentPage(), 7);
  // console.log(cars);
  console.log(currentPage());
  
  
 cars.forEach((car) => {
  const carElem = document.querySelector(`.car${car.id}`) as HTMLElement
  const flag = document.querySelector('.flag') as HTMLElement;
    startDrivingCar(car.id, carElem, flag)
 })
}

const resetRace = async () => {
  const cars = await getCars(currentPage(), 7);

 cars.forEach((car) => {
  const carElem = document.querySelector(`.car${car.id}`) as HTMLElement

    stopDrivingCar(car.id, carElem)
 })

}

document.addEventListener('click', async (e) => {
  const target = e.target as HTMLButtonElement;

  if (target.classList.contains('start-drive')) {
    const { id } = target.dataset
    const car = document.querySelector(`.car${id}`) as HTMLElement
    const flag = document.querySelector('.flag') as HTMLElement;

    if (id) {
      startDrivingCar(+id, car, flag)
    }
  }
  if (target.classList.contains('stop-drive')) {
    const { id } = target.dataset
    const car = document.querySelector(`.car${id}`) as HTMLElement

    if (id){
      stopDrivingCar(+id, car)
    }
  }
  if(target.classList.contains('race-car')) {
      startRace()
  }
  if(target.classList.contains('reset-car')) {
    resetRace()
}
});