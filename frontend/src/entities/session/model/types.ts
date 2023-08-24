export type SessionUser = {
  userID: string
  email: string
  telegramID: string
}

export type Session = {
  tokenExpireTimestamp: number
  user: SessionUser
}
