import { configureStore } from '@reduxjs/toolkit'

import listReducer from './slices/listSlice'
import itemReducer from './slices/itemSlice'
import userSlice from './slices/userSlice'

export default configureStore({
  reducer: {
    list: listReducer,
    item: itemReducer,
    user: userSlice
  },
})