import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionAPI } from 'entities/session'

export const logoutThunk = createAsyncThunk<void, void>('auth/logout', async (_, { dispatch }) => {
  dispatch(sessionAPI.endpoints.logout.initiate())
})
