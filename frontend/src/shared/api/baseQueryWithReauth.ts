import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { BaseQueryApi, QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { RootState } from 'app/store'
import { baseQuery } from './baseQuery'
import { invalidateToken } from './invalidateTokenEvent'

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
  const result = await baseQuery(args, api, extraOptions)

  const state = api.getState() as RootState

  if (state?.session && state.session.isAuth && state.session.tokenExpireTimestamp) {
    if (state.session.tokenExpireTimestamp * 1000 - Date.now() < 24 * 60 * 60 * 1000) {
      api.dispatch(invalidateToken())
    }
  }

  return result
}
