export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export enum EngineMode {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive'
}

export interface DriveMode {
  success: boolean
}

export interface DriveData {
  velocity: number,
  distance: number
}

export interface DataCar {
  name: string,
  color: string,
  id: number
}

export interface DataWinner {
  id: number,
  wins: number,
  time: number
}

export type NewCar = {
  name: string,
  color: string,
}

export default { HttpMethod }