import { DataCar, DriveData, DriveMode, EngineMode, HttpMethod, NewCar } from "./types/types";

const garageUrl = 'http://localhost:3000/garage';
const engineUrl = 'http://localhost:3000/engine';
// const winnersUrl = 'http://localhost:3000/winners';

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

  if(response.status === 400 ) {
    console.error('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"')
  }if (response.status === 404) {
    console.error('Car with such id was not found in the garage.')
  }
  return response.json()
}

export const stopEngine = async (id: number, status: EngineMode.stopped, method: HttpMethod.PATCH): Promise<DriveData> => {
  const response = await fetch(`${engineUrl}?id=${id}&status=${status}`, {
    method
  }).catch()

  if(response.status === 400 ) {
    console.error('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"')
  }if (response.status === 404) {
    console.error('Car with such id was not found in the garage.')
  }

  return response.json()
}

export const switchToDriveMode = async (id: number, status: EngineMode.drive, method: HttpMethod.PATCH): Promise<DriveMode> => {
    const response = await fetch(`${engineUrl}?id=${id}&status=${status}`, {
      method
    }).catch()

    if(response.status === 400 ) {
      console.error('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"')
      return {success: false}
    }if (response.status === 404) {
      console.error('Car with such id was not found in the garage.')
      return {success: false}
    }if (response.status === 500) {
      console.error('Car has been stopped suddenly. It is engine was broken down.')
      return {success: false}
    }if (response.status === 429) {
      console.error('Drive already in progress. You cant run drive for the same car twice while it is not stopped.')
      return {success: false}
    }
      return response.json();
}

// console.log(startEngine(3, EngineMode.started, HttpMethod.PATCH));
// console.log(stopEngine(3, EngineMode.stopped, HttpMethod.PATCH));
// console.log(switchToDriveMode(3, EngineMode.drive, HttpMethod.PATCH));

// const getWinners = async (page: number,
//    limit: number,
//   sort: string,
//    order:string, 
//    method: HttpMethod.GET): Promise<id: number, > => {
//     const response = await fetch(`${winnersUrl}?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}}`, {
//       method
//     })
//     return response.json()
// }

export default { getCountCars, getCars, createCar }

