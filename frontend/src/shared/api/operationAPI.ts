import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const operationAPI = createApi({
  reducerPath: 'operations',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getOperations: builder.query<string, string>({
      query: () => 'operations',
    }),
  }),
})

export const { useGetOperationsQuery } = operationAPI
