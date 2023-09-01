import type { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { sessionAPI } from '../api/sessionAPI'
import { userAPI } from 'entities/user'

export type SessionSliceState =
  | {
      isAuth: true
      tokenExpireTimestamp: number
    }
  | {
      isAuth: false
      tokenExpireTimestamp?: number
    }

const initialState: SessionSliceState = {
  isAuth: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userAPI.endpoints.me.matchFulfilled, (state: SessionSliceState, { payload }) => {
        if (payload.userID) {
          state.isAuth = true
          state.tokenExpireTimestamp = payload.tokenExpireTimestamp
        }
      })
      .addMatcher(sessionAPI.endpoints.login.matchFulfilled, (state: SessionSliceState, { payload }) => {
        state.isAuth = true
        state.tokenExpireTimestamp = payload.tokenExpireTimestamp
      })
      .addMatcher(sessionAPI.endpoints.refreshToken.matchFulfilled, (state: SessionSliceState, { payload }) => {
        state.isAuth = true
        state.tokenExpireTimestamp = payload.tokenExpireTimestamp
      })

      .addMatcher(sessionAPI.endpoints.logout.matchPending, (state: SessionSliceState) => {
        state.isAuth = false
        state.tokenExpireTimestamp = undefined
      })
  },
})

export const selectIsAuth = (state: RootState) => state.session.isAuth

// export const {} = sessionSlice.actions
