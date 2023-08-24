import type { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { sessionAPI } from '../api/sessionAPI'
import { SessionUser } from './types'

export type SessionSliceState =
  | {
      isAuth: true
      isInited: boolean
      tokenExpireTimestamp: number
      user: SessionUser
    }
  | {
      isAuth: false
      isInited: boolean
      tokenExpireTimestamp?: number
      user?: SessionUser
    }

const initialState: SessionSliceState = {
  isAuth: false,
  isInited: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(sessionAPI.endpoints.login.matchFulfilled, (state: SessionSliceState, { payload }) => {
        state.isAuth = true
        state.tokenExpireTimestamp = payload.tokenExpireTimestamp
        state.user = payload.user
      })
      .addMatcher(sessionAPI.endpoints.refreshToken.matchFulfilled, (state: SessionSliceState, { payload }) => {
        state.isAuth = true
        state.tokenExpireTimestamp = payload.tokenExpireTimestamp
      })
      .addMatcher(sessionAPI.endpoints.me.matchPending, (state: SessionSliceState) => {
        state.isInited = true
      })
      .addMatcher(sessionAPI.endpoints.logout.matchPending, (state: SessionSliceState) => {
        state.isInited = true
        state.isAuth = false
        state.tokenExpireTimestamp = undefined
        state.user = undefined
      })
  },
})

export const selectIsAuth = (state: RootState) => state.session.isAuth
export const selectIsInited = (state: RootState) => state.session.isInited
export const selectSessionUser = (state: RootState) => state.session.user

// export const {} = sessionSlice.actions
