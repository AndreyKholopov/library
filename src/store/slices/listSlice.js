import { createSlice } from '@reduxjs/toolkit'
import ITEM_TYPES from '../../constants/ITEM_TYPES'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    data: [],
    onlyDefinitionsData: [],
    load: false,
  },
  reducers: {
    setList: (state, action) => {
      const data = action.payload.map((el) => ({
        ...el,
        color: ITEM_TYPES.find((type) => type.value === el.itemType)?.color,
      }))

      state.data = data
      state.onlyDefinitionsData = action.payload.filter(
        (el) => el.itemType === 'definition'
      )
    },
    setLoadList: (state, action) => {
      state.load = action.payload
    },
    addItemToList: (state, action) => {
      const data = {
        ...action.payload,
        color: ITEM_TYPES.find((type) => type.value === action.payload.itemType)
          ?.color,
      }

      state.data.push(data)
      if (data.itemType === 'definition')
        state.onlyDefinitionsData.push(action.payload)
    },
    updateItemInList: (state, action) => {
      const data = {
        ...action.payload,
        color: ITEM_TYPES.find((type) => type.value === action.payload.itemType)
          ?.color,
      }

      state.data = state.data.map((el) => (el.id === data.id ? data : el))
      if (data.itemType === 'definition')
        state.onlyDefinitionsData = state.data
          .filter((el) => el.itemType === 'definition')
          .map((el) => {
            const elData = { ...el }
            elData.color = null
            return elData.id === action.payload.id ? action.payload : elData
          })
    },
  },
})

export const { setList, setLoadList, addItemToList, updateItemInList } =
  listSlice.actions

export default listSlice.reducer
