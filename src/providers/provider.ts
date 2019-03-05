import { ObjectType } from '../type'

export abstract class Provider {
  abstract get(url: string, params: ObjectType): Promise<object>
  abstract post(url: string, params: ObjectType, headers?: ObjectType): Promise<object>
  // abstract get: (url: string, params: ObjectType) => Promise<object>
  // abstract post: (url: string, params: ObjectType, headers?: ObjectType) => Promise<object>
  // getContract: (url: string) => Promise<object>
}

export enum Network {
  Local,
  Test,
  Main
}
