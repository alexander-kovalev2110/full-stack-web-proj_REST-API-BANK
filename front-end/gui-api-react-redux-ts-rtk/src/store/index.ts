import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './uiSlice'
import paginationSlice from './paginationSlice'
import custSlice from './cust/custSlice'
import modalSlice from './modalSlice'
import transSlice from './trans/transSlice'

import { authListenerMiddleware } from "./listeners/authListeners"

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    cust: custSlice,
    modal: modalSlice,
    trans: transSlice,
    pagination: paginationSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch