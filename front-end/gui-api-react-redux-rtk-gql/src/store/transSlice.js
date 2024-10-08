import { createSlice } from "@reduxjs/toolkit"

const page = 5

export const transSlice = createSlice({
    name: "trans",
    initialState: {
        command: "",
        transactions: [],
        tabAr: [],
        offset: 0,
        previousDisabled: true,
        nextDisabled: true,
    },
    reducers: {
        setCommand: (state, action) => {
            state.command = action.payload
        },
        setTrans: (state, action) => {
            state.transactions = action.payload
            state.tabAr = action.payload.filter(
                (el, index) => index >= 0 && index < page,
            )
            state.offset = 0
            state.nextDisabled = !(page < action.payload.length)
            state.previousDisabled = true
        },
        resetTrans: (state) => {
            state.command = ""
            state.transactions = []
            state.tabAr = []
            state.offset = 0
            state.nextDisabled = true
            state.previousDisabled = true
        },
        previousPage: (state) => {            
            state.tabAr = state.transactions.filter(
                (el, index) =>
                    index >= state.offset - page && index < state.offset
            )
            state.offset = state.offset - page;
            state.nextDisabled = !(
                state.offset + page <
                state.transactions.length
            )
            state.previousDisabled = !(state.offset > 0)
        },
        nextPage: (state) => {
            state.tabAr = state.transactions.filter(
                (el, index) =>
                    index >= state.offset + page && index < state.offset + page + page
            )
            state.offset = state.offset + page
            state.nextDisabled = !(state.offset + page < state.transactions.length)
            state.previousDisabled = !(state.offset > 0)
        },
    },
})

export const { setCommand, setTrans, resetTrans, previousPage, nextPage } =
    transSlice.actions

export default transSlice.reducer
