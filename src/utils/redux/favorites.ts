import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface FavoritesSlice {
  favorites: string[]
}

const initialState: FavoritesSlice = {
  favorites: [],
}

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload
    },
  },
})

export const { setFavorites } = favorites.actions
export default favorites.reducer
