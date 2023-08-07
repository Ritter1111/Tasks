import { createWinner, getCars, getWinners, startEngine, stopEngine, switchToDriveMode, updateWinner } from "../api";
import { EngineMode, HttpMethod } from "../types/types";
import { addDisabledToStart, addDisabledToStop, removeDisabledToStop, romoveDisabledToStart } from "./car-utils";
import { currentPage } from "./pagination";

let animationId: number = 0;
const finishedCars: number[] = [];

export const displayWinnerName = (id: number) => {
  const carElem = document.querySelector(`.car${id}`) as HTMLElement;
  const carName = carElem.dataset.name;

  const winnerElem = document.createElement('h1');
  winnerElem.innerHTML = `${carName} went first`
  winnerElem.className = 'winner-text'
  document.body.append(winnerElem)

  const displayDuration = 3000;

  setTimeout(() => {
    winnerElem.remove();
  }, displayDuration);
};

export async function createWinners(id: number, duration: number) {
  let time = Number((duration / 1000).toFixed(2))
  let wins = 1
  const allWinners = await getWinners(1, 10, 'id', 'order')
  allWinners.forEach(async (item) => {
    if (item.id === id) {
      wins = item.wins + 1
    }else if(item.time < time){
      time = item.time
    }
  })
  if (wins > 1) {
    await updateWinner(id, { 'id': id, 'wins': wins, 'time': time }, HttpMethod.PUT)
  } else {
    await createWinner({ 'id': id, 'wins': wins, 'time': time }, HttpMethod.POST)
  }
}

export function animateCar(car: HTMLElement, flag: HTMLElement, duration: number, id: number) {
  const currentPositionCar = car.offsetLeft;
  const distance = Math.abs(car.offsetLeft - flag.offsetLeft) + 55
  let start = 0;
  const framesPerSeconds = 60
  const milisecondsToSeconds = duration / 1000
  const frames = milisecondsToSeconds * framesPerSeconds;
  const distanceX = (distance - currentPositionCar) / frames

  const tickAnimate = async () => {
    start += distanceX
    car.style.transform = `translateX(${start}px)`

    if (start < distance) {
      animationId = requestAnimationFrame(tickAnimate)
    } else if (finishedCars.length === 0) {
      finishedCars.push(id)
      createWinners(id, duration)
      displayWinnerName(finishedCars[0]);
    }
  }
  tickAnimate()
}

export const startDrivingCar = async (id: number, car: HTMLElement, flag: HTMLElement) => {
  const { velocity, distance } = await startEngine(id, EngineMode.started, HttpMethod.PATCH);
  const duration = distance / velocity;

  animateCar(car, flag, duration, id);

  const response = await switchToDriveMode(id, EngineMode.drive, HttpMethod.PATCH);

  if (!response.success) {
    cancelAnimationFrame(animationId)
  }
}

export const stopDrivingCar = async (id: number, car: HTMLElement) => {
  await stopEngine(id, EngineMode.stopped, HttpMethod.PATCH);
  if (animationId !== 0) {
    cancelAnimationFrame(animationId)

  }
  car.style.transform = `translateX(${0}px)`
}

export const startRace = async () => {
  const cars = await getCars(currentPage(), 7);

  cars.forEach((car) => {
    addDisabledToStart(car.id)
    removeDisabledToStop(car.id)

    const carElem = document.querySelector(`.car${car.id}`) as HTMLElement
    const flag = document.querySelector('.flag') as HTMLElement;
    startDrivingCar(car.id, carElem, flag)
  })
}

export const resetRace = async () => {
  const cars = await getCars(currentPage(), 7);

  cars.forEach((car) => {
    const carElem = document.querySelector(`.car${car.id}`) as HTMLElement

    romoveDisabledToStart(car.id)
    addDisabledToStop(car.id)
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
      addDisabledToStart(+id)
      removeDisabledToStop(+id)
      startDrivingCar(+id, car, flag)
    }
  }
  if (target.classList.contains('stop-drive')) {
    const { id } = target.dataset
    const car = document.querySelector(`.car${id}`) as HTMLElement

    if (id) {
      romoveDisabledToStart(+id)
      addDisabledToStop(+id)
      stopDrivingCar(+id, car)
    }
  }
  if (target.classList.contains('race-car')) {
    startRace()
    const reset = document.querySelector('.reset-car') as HTMLButtonElement;
    const race = document.querySelector('.race-car') as HTMLButtonElement;
    reset.disabled = false;
    race.disabled = true
    
    finishedCars.length = 0;
  }
  if (target.classList.contains('reset-car')) {
    resetRace()
    const reset = document.querySelector('.reset-car') as HTMLButtonElement;
    const race = document.querySelector('.race-car') as HTMLButtonElement;
    reset.disabled = true;
    race.disabled = false
    finishedCars.length = 0;
  }
})

export default resetRace