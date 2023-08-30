import { createAsyncThunk } from '@reduxjs/toolkit'
import { isFetchBaseQueryError, isServerError } from 'shared/api'
import { accountAPI } from 'entities/account'

export const removeAccount = createAsyncThunk<void, string>(
  'account/remove',
  async (accountID: string, { dispatch }) => {
    try {
      await dispatch(accountAPI.endpoints.deleteByID.initiate(accountID)).unwrap()
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
