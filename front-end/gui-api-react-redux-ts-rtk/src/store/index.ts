import { configureStore } from '@reduxjs/toolkit'
import alertSlice from './alertSlice'
import custSlice from './cust/custSlice'
import modalSlice from './modalSlice'
import transSlice from './trans/transSlice'

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    cust: custSlice,
    modal: modalSlice,
    trans: transSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch