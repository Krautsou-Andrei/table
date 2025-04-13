import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ThemeSlice {
  isDark: boolean
}

const initialState: ThemeSlice = {
  isDark: true,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDark: (state: ThemeSlice, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
    },
  },
})

export const { setIsDark } = themeSlice.actions
export default themeSlice.reducer
