import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        authorOpen: false,
        transOpen: false,
        authorKind: ""
    },
    reducers: {
        openAuthor: (state, action) => {
            state.authorOpen = true
            state.authorKind = action.payload
        },
        closeAuthor: (state) => {
            state.authorOpen = false
        },
        openTrans: (state) => {
            state.transOpen = true
        },
        closeTrans: (state) => {
            state.transOpen = false
        },
    },
})

export const { openAuthor, closeAuthor, openTrans, closeTrans } =
    modalSlice.actions

export default modalSlice.reducer
