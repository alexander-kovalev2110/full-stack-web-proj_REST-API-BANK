import { configureStore } from "@reduxjs/toolkit"

import alertSlice from "./alertSlice"
import custSlice from "./custSlice"
import modalSlice from "./modalSlice"
import transSlice from "./transSlice"

export const store = configureStore({
    reducer: {
        alert: alertSlice,
        cust: custSlice,
        modal: modalSlice,
        trans: transSlice,
    },
})
