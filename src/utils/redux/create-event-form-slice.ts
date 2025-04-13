import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface CreateEventFormSlice {
  isSend: boolean
}

const initialState: CreateEventFormSlice = {
  isSend: false,
}

export const createEventFormSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    setIsSend: (state: CreateEventFormSlice, action: PayloadAction<boolean>) => {
      state.isSend = action.payload
    },
  },
})

export const { setIsSend } = createEventFormSlice.actions
export default createEventFormSlice.reducer
