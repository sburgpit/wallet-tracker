import { sessionSlice } from 'entities/session'
import { themeSlice } from 'entities/theme'
import { userSlice } from 'entities/user'
import storage from 'redux-persist/lib/storage'

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: [sessionSlice.name, themeSlice.name, userSlice.name], //debugModeSlice.name
}
