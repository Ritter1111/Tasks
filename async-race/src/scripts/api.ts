import { DataCar, DataWinner, DriveData, DriveMode, EngineMode, HttpMethod, NewCar } from "./types/types";

const garageUrl = 'http://localhost:3000/garage';
const engineUrl = 'http://localhost:3000/engine';
const winnersUrl = 'http://localhost:3000/winners';

export const getCar = async (id: number): Promise<DataCar> =>
  (await (fetch(`${garageUrl}/${id}`))).json()

  
export const getCountCars = async (page: number, limit: number): Promise<number> => {
  const res = await fetch(`${garageUrl}?_limit=${limit}&_page=${page}`)
  const countCars = Number(res.headers.get('X-Total-Count'))

  return countCars
}

export const getCars = async (page: number, limit: number): Promise<DataCar[]> => {
  const res = await fetch(`${garageUrl}?_limit=${limit}&_page=${page}`)

  return res.json()
}

export const createCar = async (body: NewCar, method: HttpMethod.POST): Promise<DataCar> => {
  const response = await fetch(garageUrl, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

export const removeCar = async (id: number, method: HttpMethod.DELETE): Promise<DataCar> => {
  const response = await fetch(`${garageUrl}/${id}`, {
    method
  })

  return response.json()
}

export const updateCar = async (id: number, body: NewCar, method: HttpMethod.PUT): Promise<DataCar> => {
  const response = await fetch(`${garageUrl}/${id}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.json()
}

export const startEngine = async (id: number, status: EngineMode.started, method: HttpMethod.PATCH): Promise<DriveData> => {
  const response = await fetch(`${engineUrl}?id=${id}&status=${status}`, {
    method
  }).catch()

  return response.json()
}

export const stopEngine = async (id: number, status: EngineMode.stopped, method: HttpMethod.PATCH): Promise<DriveData> => {
  const response = await fetch(`${engineUrl}?id=${id}&status=${status}`, {
    method
  }).catch()

  return response.json()
}

export const switchToDriveMode = async (id: number, status: EngineMode.drive, method: HttpMethod.PATCH): Promise<DriveMode> => {
  const response = await fetch(`${engineUrl}?id=${id}&status=${status}`, {
    method
  }).catch()

  if (response.status === 400) {
    return { success: false }
  } if (response.status === 404) {
    return { success: false }
  } if (response.status === 500) {
    return { success: false }
  } if (response.status === 429) {
    return { success: false }
  }
  return response.json();
}

export const getWinnersCount = async (page: number, limit: number, sort: string, order: string): Promise<number> => {
  const response = await fetch(`${winnersUrl}?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}}`);

  const countCars = Number(response.headers.get('X-Total-Count'))
  return countCars
}

export const getWinner = async (id: number): Promise<DataWinner> => {
  const response = await (fetch(`${winnersUrl}/${id}`))

  return response.json()
}

export const getWinners = async (page: number, limit: number, sort: string, order: string): Promise<DataWinner[]> => {
  const response = await fetch(`${winnersUrl}?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}}`);
  return response.json()
}

export const createWinner = async (body: DataWinner, method: HttpMethod.POST): Promise<DataWinner> => {
  const response = await fetch(`${winnersUrl}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch()

  return response.json()
}

export const updateWinner = async (id: number, body: DataWinner, method: HttpMethod.PUT): Promise<DataWinner> => {
  const response = await fetch(`${winnersUrl}/${id}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json()
}

export const removeWinner = async (id: number, method: HttpMethod.DELETE): Promise<DataWinner> => {
  const response = await fetch(`${winnersUrl}/${id}`, {
    method
  })

  return response.json()
}

export default { getCountCars, getCars, createCar }

