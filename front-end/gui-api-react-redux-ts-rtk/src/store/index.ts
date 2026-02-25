import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './ui-layout/ui.slice'
// import paginationSlice from './pagination/pagination.slice'
import custSlice from './cust/cust.slice'
import modalSlice from './modal/modal.slice'
import transSlice from './trans/trans.slice'

import { authListenerMiddleware } from "./listeners/event.listeners"

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    cust: custSlice,
    modal: modalSlice,
    trans: transSlice,
    // pagination: paginationSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch