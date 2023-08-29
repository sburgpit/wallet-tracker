import { createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from 'entities/user'
import { invalidateToken } from 'shared/api'

export const initSessionThunk = createAsyncThunk('auth/init', async (_, { dispatch }) => {
  try {
    const result = await dispatch(userAPI.endpoints.me.initiate()).unwrap()
    if (!result) dispatch(invalidateToken())
  } catch (e) {
    console.log(e)
    throw new Error('Unknown error when init user')
  }
})
