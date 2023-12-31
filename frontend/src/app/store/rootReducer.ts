import { combineReducers } from '@reduxjs/toolkit'
import { modalSlice } from 'entities/modal'
import { sessionSlice } from 'entities/session'
import { telegramSlice } from 'entities/telegram'
import { themeSlice } from 'entities/theme'
import { userSlice } from 'entities/user'
import { baseAPI } from 'shared/api'

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [telegramSlice.name]: telegramSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
})
