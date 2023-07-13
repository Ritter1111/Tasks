// import { HttpMethod } from "./types/types";

import { DataCar, HttpMethod, NewCar } from "./types/types";

// const requestUrl = 'http://localhost:3000/garage';
const garageRequest = 'http://localhost:3000/garage';
// const winnersRequest = 'http://localhost:3000/winners';


// function sendRequest(method: HttpMethod, url: string) {
//   return fetch(url).then(response => response.text())
// }

// const getCar = async (id: number): Promise<{
//   name:string, color:string, id: number
// }> => 
// (await (fetch(`${garageRequest}/${id}`))).json()

// export const getCar = async (): Promise<{id: number}> => {
// const idd = await (fetch(`${garageRequest}/${id}`))
//   return idd.json()
// }

// console.log(getCar(1))

// async function obj() {
//   const objResult = await getCar(2)
//   console.log(objResult.name)
//   return objResult.name
// }

// const createCar = async (method: HttpMethod,)

export const getCountCars = async (page: number, limit: number): Promise<number> => {
  const res = await fetch(`${garageRequest}?_limit=${limit}&_page=${page}`)

  const countCars = Number(res.headers.get('X-Total-Count'))
  return countCars
}

export const getCars = async (page: number, limit: number): Promise<DataCar[]> => {
  const res = await fetch(`${garageRequest}?_limit=${limit}&_page=${page}`)
  return res.json()
}

export const createCar = async (body: NewCar, method: HttpMethod.POST): Promise<DataCar[]> => {
  const response = await fetch(garageRequest, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

export const removeCar = async (id: number, method: HttpMethod.DELETE): Promise<DataCar[]> => {
  const response = await fetch(`${garageRequest}/${id}`, {
    method
  })

  return response.json()
}

export default {getCountCars, getCars, createCar}

// sendRequest(HttpMethod.GET, garageRequest)
// .then(data => console.log(data))

// const getObjectsCount = async () => {
//     const response = await fetch(garageRequest);
//     const data = await response.json();
//     const totalObjects = data.length;
//     console.log(`Total objects: ${totalObjects}`);
// };

// getObjectsCount();

