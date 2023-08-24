import type { RootState } from 'app/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '..'
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
  },
})

export const selectUserData = (state: RootState) => state.user.userData

export const { setUserData } = userSlice.actions
