import { createSlice } from '@reduxjs/toolkit'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    data: [],
    load: false
  },
  reducers: {
    setList: (state, action) => {
      state.data = action.payload
    },
    setLoadList: (state, action) => {
      state.load = action.payload
    },
    addItemToList: (state, action) => {
      state.data.push(action.payload)
    },
    updateItemInList: (state, action) => {
      state.data = state.data.map(data => data.id === action.payload.id ? action.payload : data)
    },
  },
})

export const { setList, setLoadList, addItemToList, updateItemInList } = listSlice.actions

export default listSlice.reducer