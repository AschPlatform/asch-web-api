import { ObjectType } from '../type'
export interface Provider {
  get: (url: string, params: ObjectType) => Promise<object>
  post: (url: string, params: ObjectType, headers?: ObjectType) => Promise<object>
  // getContract: (url: string) => Promise<object>
}
