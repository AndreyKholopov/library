import { createSlice } from '@reduxjs/toolkit'
import itemTypes from '../../constants/itemTypes'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    data: [],
    onlyDefinitionsData: [],
    load: false
  },
  reducers: {
    setList: (state, action) => {
      const data = action.payload.map(el => ({
        ...el,
        color: itemTypes.find(type => type.value === el.itemType)?.color
      }))

      state.data = data
      state.onlyDefinitionsData = data.filter(el => el.itemType === 'definition')
    },
    setLoadList: (state, action) => {
      state.load = action.payload
    },
    addItemToList: (state, action) => {
      const data = {
        ...action.payload,
        color: itemTypes.find(type => type.value === action.payload.itemType)?.color
      }

      state.data.push(data)
      if (data.itemType === 'definition') state.onlyDefinitionsData.push(data)
    },
    updateItemInList: (state, action) => {
      action.payload.color = itemTypes.find(type => type.value === action.payload.itemType)?.color
      const data = action.payload

      state.data = state.data.map(el => el.id === data.id ? data : el)
      if (data.itemType === 'definition') state.onlyDefinitionsData = state.data.map(el => el.id === data.id ? data : el)
    },
  },
})

export const { setList, setLoadList, addItemToList, updateItemInList } = listSlice.actions

export default listSlice.reducer