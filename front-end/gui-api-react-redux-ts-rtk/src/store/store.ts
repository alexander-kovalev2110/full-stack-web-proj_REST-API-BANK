import { configureStore } from '@reduxjs/toolkit'
import alertSlice from './alertSlice'
import custSlice from './custSlice'
import modalSlice from './modalSlice'
import transSlice from './transSlice'

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    cust: custSlice,
    modal: modalSlice,
    trans: transSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch