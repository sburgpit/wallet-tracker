import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionAPI } from 'entities/session'
import { isFetchBaseQueryError, isServerError } from 'shared/api'

type Params = {
  email: string
  password: string
}

export const loginThunk = createAsyncThunk<void, Params>('auth/login', async (body: Params, { dispatch }) => {
  try {
    await dispatch(sessionAPI.endpoints.login.initiate(body)).unwrap()
  } catch (e) {
    console.log(e)
    if (isServerError(e) && e.data) {
      throw new Error(e.data.errors[0].message)
    }
    if (isFetchBaseQueryError(e) && e.data && typeof e.data === 'string') {
      throw new Error(e.data)
    }
    throw new Error('Unknown error')
  }
})
