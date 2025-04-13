import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.ts'
import adminReducer from './adminSlice.ts'
import createEventForm from './create-event-form-slice.ts'
import favorites from './favorites.ts'
import filterSettings from './filter-settings-slice.ts'
import themeSlice from './theme-slice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    createEvent: createEventForm,
    favorites: favorites,
    filterSettings: filterSettings,
    theme: themeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
