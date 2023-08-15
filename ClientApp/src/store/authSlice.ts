import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    ifRefreshCurrentUserDetails: false,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setIfRefreshCurrentUserDetails: (state, action) => {
      state.ifRefreshCurrentUserDetails = action.payload
    },
  },
})

export const { setIsAuthenticated, setIfRefreshCurrentUserDetails } = authSlice.actions
export default authSlice.reducer
