import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { Tags } from './tags'

export const baseAPI = createApi({
  tagTypes: [Tags.SESSION, Tags.USER, Tags.ACCOUNT, Tags.BANK],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
