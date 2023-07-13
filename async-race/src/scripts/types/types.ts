export enum HttpMethod {
  GET = 'GET',
  POST = 'POST'
}

export interface DataCar {
  name:string, 
  color:string, 
  id: number
}

export default { HttpMethod}