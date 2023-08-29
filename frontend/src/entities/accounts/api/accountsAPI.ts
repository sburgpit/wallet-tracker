import { baseAPI } from 'shared/api'
import type { Accounts } from '../model/types'
import qs from 'qs'

export const accountsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    accounts: build.query<Accounts, string>({
      query: (userID) => ({
        url: `/accounts?${qs.stringify({ limit: 100, where: { owner: { equals: userID } } })}`,
      }),
    }),
  }),
})

export const { useAccountsQuery } = accountsAPI