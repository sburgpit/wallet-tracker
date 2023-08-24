type ServerErrorsArray = { message: string }[]

export class ServerError extends Error {
  data: {
    errors: ServerErrorsArray
  }
  status: number

  constructor(message: string = 'ServerError', serverErrors: ServerErrorsArray, status: number) {
    super(message)
    this.name = 'ServerError'
    this.data = { errors: [] }
    this.data.errors = serverErrors
    this.status = status
  }
}
