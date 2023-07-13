export enum HttpMethod {
  GET = 'GET',
  POST = 'POST'
}

export interface DataCar {
  name:string, 
  color:string, 
  id: number
}

export type NewCar = {
  name:string, 
  color:string, 
} 

export default { HttpMethod}