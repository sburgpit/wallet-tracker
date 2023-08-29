import { baseAPI, Tags } from 'shared/api'
import type { User } from '../model/types'
import { mapUser } from '../lib/mapUser'
import { UserDTO } from './types'

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => `/users/me`,
      providesTags: [Tags.USER],
      transformResponse: (user: UserDTO) => mapUser(user),
    }),
  }),
})

export const { useMeQuery } = userAPI
