import { createSlice } from "@reduxjs/toolkit"

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        alertOpen: false,
        errMessage: ""
    },
    reducers: {
        openAlert: (state, action) => {
            state.alertOpen = true
            state.errMessage = action.payload
        },
        closeAlert: (state) => {
            state.alertOpen = false
            state.errMessage = ""
        },
    },
});

export const { openAlert, closeAlert } = alertSlice.actions

export default alertSlice.reducer
