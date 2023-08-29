import { baseAPI } from 'shared/api'
import qs from 'qs'
import { Currency } from 'types/payload-types'
import { Doc } from 'types/payload-doc'

export const currencyAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    currencies: build.query<Doc<Currency>, void>({
      query: () => ({
        url: `/currencies?${qs.stringify({ limit: 100 })}`,
      }),
    }),
  }),
})

export const { useCurrenciesQuery } = currencyAPI
