import { TypeWithID } from 'payload/dist/collections/config/types'

export const castToID = (data: TypeWithID | string) => (typeof data === 'string' ? data : data.id)
