import { createSlice } from '@reduxjs/toolkit'
import itemTypes from '../../constants/itemTypes'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    data: [],
    load: false
  },
  reducers: {
    setList: (state, action) => {
      state.data = action.payload.map(el => ({
        ...el,
        color: itemTypes.find(type => type.value === el.itemType)?.color
      }))
    },
    setLoadList: (state, action) => {
      state.load = action.payload
    },
    addItemToList: (state, action) => {
      state.data.push({
        ...action.payload,
        color: itemTypes.find(type => type.value === action.payload.itemType)?.color
      })
    },
    updateItemInList: (state, action) => {
      action.payload.color = itemTypes.find(type => type.value === action.payload.itemType)?.color
      state.data = state.data.map(data => data.id === action.payload.id ? action.payload : data)
    },
  },
})

export const { setList, setLoadList, addItemToList, updateItemInList } = listSlice.actions

export default listSlice.reducer