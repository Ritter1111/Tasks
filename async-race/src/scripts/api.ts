// import { HttpMethod } from "./types/types";

import { DataCar, HttpMethod, NewCar } from "./types/types";

// const requestUrl = 'http://localhost:3000/garage';
const garageUrl = 'http://localhost:3000/garage';
// const winnersUrl = 'http://localhost:3000/winners';


// function sendRequest(method: HttpMethod, url: string) {
//   return fetch(url).then(response => response.text())
// }
export const getCar = async (id: number): Promise<{
  name:string, color:string, id: number
}> => 
(await (fetch(`${garageUrl}/${id}`))).json()

// export const getCar = async (): Promise<{id: number}> => {
// const idd = await (fetch(`${garageRequest}/${id}`))
//   return idd.json()
// }

// console.log(getCar(4))

// async function obj() {
//   const objResult = await getCar(2)
//   console.log(objResult.name)
//   return objResult.name
// }

// const createCar = async (method: HttpMethod,)

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

export const removeCar = async (id: number, method: HttpMethod.DELETE): Promise<DataCar[]> => {
  const response = await fetch(`${garageUrl}/${id}`, {
    method
  })

  return response.json()
}

export const updateCar = async (id: number, body: NewCar, method: HttpMethod.PUT): Promise<DataCar[]> => {
  const response = await fetch(`${garageUrl}/${id}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

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

