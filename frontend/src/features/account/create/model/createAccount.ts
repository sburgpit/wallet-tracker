import { createAsyncThunk } from '@reduxjs/toolkit'
import { isFetchBaseQueryError, isServerError } from 'shared/api'
import { AccountFormSchema } from './accountFormSchema'
import { accountAPI } from 'entities/accounts'

export const createAccount = createAsyncThunk<void, AccountFormSchema>(
  'account/create',
  async (body: AccountFormSchema, { dispatch }) => {
    try {
      await dispatch(accountAPI.endpoints.create.initiate(body)).unwrap()
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
  }
)
