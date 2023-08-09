import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userUid: '',
    accessToken: ''
  },
  reducers: {
    setUserUid: (state, action) => {
      state.userUid = action.payload
      localStorage.setItem('userUid', action.payload);
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
})

export const { setUserUid, setAccessToken } = userSlice.actions

export default userSlice.reducer