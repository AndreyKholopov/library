import { createSlice } from '@reduxjs/toolkit'

export const ItemSlice = createSlice({
  name: 'list',
  initialState: {
    data: {},
    load: false,
  },
  reducers: {
    setItem: (state, action) => {
      state.data = action.payload
    },
    setLoadItem: (state, action) => {
      state.load = action.payload
    },
  },
})

export const { setItem, setLoadItem } = ItemSlice.actions

export default ItemSlice.reducer
