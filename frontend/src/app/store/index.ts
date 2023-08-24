import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { baseAPI } from 'shared/api'
import { rootReducer } from './rootReducer'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { invalidateTokenListener } from 'features/auth/invalidateToken'
import { persistConfig } from './persistConfig'

const makeStore = () => {
  const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer) as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
      }).concat(baseAPI.middleware, invalidateTokenListener.middleware),
    devTools: import.meta.env.DEV,
  })

  setupListeners(store.dispatch)

  return store
}

export const store = makeStore()
export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
