import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Theme } from 'shared/config/theme'
import { RootState } from 'app/store'

type ThemeSliceState = {
  currentTheme: Theme
}

const initialState: ThemeSliceState = {
  currentTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload
    },
  },
})

export const selectCurrentTheme = (state: RootState) => state.theme.currentTheme

export const { changeTheme } = themeSlice.actions
