export type RequestCreateAccountBody = {
  type: string
  name: string
  currency: string
  balance: string
  includeToBalance: boolean
  isSavings: boolean
  isArchived: boolean
  owner: string
}
