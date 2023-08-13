import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    jwtToken: null,
  },
  reducers: {
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload
    },
  },
})

export const { setJwtToken } = authSlice.actions
export default authSlice.reducer
