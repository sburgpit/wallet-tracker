import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { operationAPI } from 'shared/api/operationAPI'

const initStore = () => {
  const store = configureStore({
    reducer: {
      [operationAPI.reducerPath]: operationAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(operationAPI.middleware),
  })

  setupListeners(store.dispatch)

  return store
}

export const store = initStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
