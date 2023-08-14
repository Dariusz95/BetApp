import { configureStore } from '@reduxjs/toolkit'
import matchSlice from './matchSlice'
import authSlice from './authSlice'

const store = configureStore({
  reducer: {
    selectedMatches: matchSlice,
    auth: authSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
