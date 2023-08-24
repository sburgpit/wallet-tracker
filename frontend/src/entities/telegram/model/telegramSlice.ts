import { createSlice } from '@reduxjs/toolkit'

type TelegramSliceState = null
const initialState: TelegramSliceState = null

export const telegramSlice = createSlice({
  name: 'telegram',
  initialState,
  reducers: {},
})

// export const selectUserData = (state: RootState) => state.user.userData

// export const { setUserData } = userSlice.actions
