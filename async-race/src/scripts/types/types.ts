export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

// export interface EngineMode {

// }

export interface DriveData {
  velocity: number,
  distance: number
}

export interface DataCar {
  name: string,
  color: string,
  id: number
}

export type NewCar = {
  name: string,
  color: string,
}

export default { HttpMethod }