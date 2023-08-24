import { baseAPI, Tags } from 'shared/api'
import type { User } from '../model/types'

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    userData: build.query<User, string>({
      query: (userID) => `/users/${userID}`,
      providesTags: [Tags.USER],
    }),
  }),
})

export const { useUserDataQuery } = userAPI
