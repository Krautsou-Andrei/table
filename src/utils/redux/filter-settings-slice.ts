import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EVENT_SORT } from '@/consts/event-sort'
import { EventCategory } from '@/types/api'

export interface FilterSettingsSlice {
  categoty?: EventCategory
  citiId: string
  date: string | null
  sort?: EVENT_SORT
}

const initialState: FilterSettingsSlice = {
  categoty: undefined,
  citiId: '1',
  date: null,
  sort: undefined,
}

export const filterSettings = createSlice({
  name: 'filterSettings',
  initialState,
  reducers: {
    setFilterSettings: (state, action: PayloadAction<FilterSettingsSlice>) => {
      return { ...state, ...action.payload }
    },
    setFilterCitiId: (state, action: PayloadAction<string>) => {
      state.citiId = action.payload
    },
    setFilterDate: (state, action: PayloadAction<string | null>) => {
      state.date = action.payload
    },
    setFilterCategory: (state, action: PayloadAction<EventCategory | undefined>) => {
      state.categoty = action.payload
    },
    setFilterSort: (state, action: PayloadAction<EVENT_SORT | undefined>) => {
      state.sort = action.payload
    },
  },
})

export const { setFilterSettings, setFilterCitiId, setFilterDate, setFilterCategory, setFilterSort } =
  filterSettings.actions

export default filterSettings.reducer
