import { Tags, baseAPI } from 'shared/api'
import type { AccountList } from '../model/types'
import qs from 'qs'
import { RequestCreateAccountBody } from './types'

export const accountAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    accounts: build.query<AccountList, string>({
      query: (userID) => ({
        url: `/accounts?${qs.stringify({ limit: 100, where: { owner: { equals: userID } } })}`,
      }),
      providesTags: [Tags.ACCOUNT],
    }),
    create: build.mutation<unknown, RequestCreateAccountBody>({
      query: (body) => ({
        url: '/accounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [Tags.ACCOUNT],
    }),
    deleteByID: build.mutation<unknown, string>({
      query: (accountID) => ({
        url: `/accounts/${accountID}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useAccountsQuery } = accountAPI
