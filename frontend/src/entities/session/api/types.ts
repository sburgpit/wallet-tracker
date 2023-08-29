export type SessionDTO = {
  user: {
    id: string
    email: string
    telegramID: string
    createdAt: string
    updatedAt: string
  }
  token: string
  exp: number
}

export type RequestLoginBody = {
  email: string
  password: string
}
