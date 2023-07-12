// import { HttpMethod } from "./types/types";

// const requestUrl = 'http://localhost:3000/garage';
const garageRequest = 'http://localhost:3000/garage';
// const winnersRequest = 'http://localhost:3000/winners';


// function sendRequest(method: HttpMethod, url: string) {
//   return fetch(url).then(response => response.text())
// }

const getCar = async (id: number): Promise<{
  name:string, color:string, id: number
}> => 
(await (fetch(`${garageRequest}/${id}`))).json()

console.log(getCar(2))

// sendRequest(HttpMethod.GET, garageRequest)
// .then(data => console.log(data))



