import type { RootState } from 'app/store'
import type { User } from './types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../api/userAPI'
import { sessionAPI } from 'entities/session'

type UserSliceState = {
  userData: User | null
}
const initialState: UserSliceState = {
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<User | null>) => {
      state.userData = payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionAPI.endpoints.logout.matchPending, (state: UserSliceState) => {
      state.userData = null
    })
    builder.addMatcher(userAPI.endpoints.me.matchFulfilled, (state: UserSliceState, { payload }) => {
      state.userData = payload
    })
  },
})

export const selectUserData = (state: RootState) => state.user.userData
export const selectUserID = (state: RootState) => state.user.userData?.userID

export const { setUserData } = userSlice.actions
