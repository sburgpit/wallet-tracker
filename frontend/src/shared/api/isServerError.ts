import { ServerError } from './ServerError'

export const isServerError = (error: unknown): error is ServerError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'errors' in error.data
  )
}
