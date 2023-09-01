import { Tags, baseAPI } from 'shared/api'
import type { BankList } from '../model/types'
import qs from 'qs'
import { RequestCreateBankBody } from './types'

export const bankAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    bankList: build.query<BankList, string>({
      query: (userID) => ({
        url: `/banks?${qs.stringify({ limit: 100, where: { owner: { equals: userID } } })}`,
      }),
      providesTags: [Tags.BANK],
    }),
    createBank: build.mutation<unknown, RequestCreateBankBody>({
      query: (body) => ({
        url: '/banks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [Tags.BANK],
    }),
  }),
})

export const { useBankListQuery, useCreateBankMutation } = bankAPI
