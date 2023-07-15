import { configureStore } from '@reduxjs/toolkit'
import matchSlice from './matchSlice'

const store = configureStore({
  reducer: {
    selectedMatches: matchSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
