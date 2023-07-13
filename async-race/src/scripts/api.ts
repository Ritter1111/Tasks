// import { HttpMethod } from "./types/types";

import { DataCar } from "./types/types";

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

export default {getCountCars, getCars}

// sendRequest(HttpMethod.GET, garageRequest)
// .then(data => console.log(data))

// const getObjectsCount = async () => {
//     const response = await fetch(garageRequest);
//     const data = await response.json();
//     const totalObjects = data.length;
//     console.log(`Total objects: ${totalObjects}`);
// };

// getObjectsCount();

