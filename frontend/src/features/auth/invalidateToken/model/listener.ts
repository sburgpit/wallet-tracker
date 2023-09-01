import { invalidateToken } from 'shared/api'
import { listenerMiddleware } from 'shared/lib/middlewares'
import { sessionAPI } from 'entities/session'
import { logoutThunk } from '../../logout/model/logoutThunk'

export const invalidateTokenListener = listenerMiddleware

let isRefreshing = false

invalidateTokenListener.startListening({
  actionCreator: invalidateToken,
  effect: async (_, { dispatch }) => {
    if (isRefreshing) return
    try {
      isRefreshing = true
      await dispatch(sessionAPI.endpoints.refreshToken.initiate()).unwrap()
    } catch (e) {
      dispatch(logoutThunk())
      throw e
    } finally {
      isRefreshing = false
    }
  },
})
