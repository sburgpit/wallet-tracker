import { baseAPI, Tags } from 'shared/api'
import type { Session } from '../model/types'
import type { SessionDTO, RequestLoginBody, SessionExpireDTO } from './types'
import { mapSession } from '../lib/mapSession'

export const sessionAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/users/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [Tags.SESSION],
      transformResponse: (response: SessionDTO) => mapSession(response),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
      invalidatesTags: [Tags.SESSION],
    }),
    refreshToken: build.mutation<Session, void>({
      query: () => ({
        url: `/users/refresh-token`,
        method: 'POST',
      }),
      invalidatesTags: [Tags.SESSION],
      transformResponse: (response: SessionDTO) => mapSession(response),
    }),
    me: build.mutation<Session | null, void>({
      query: () => `/users/me`,
      invalidatesTags: [Tags.SESSION],
      transformResponse: (response: SessionDTO | SessionExpireDTO) =>
        response.user ? mapSession(response as SessionDTO) : null,
    }),
  }),
})
