// src/store/trans/transSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Transaction, TransState, PAGE_SIZE } from "./transTypes"
import { command } from "../interfaces"

const initialState: TransState = {
  command: "",
  transactions: [],
  tabAr: [],
  offset: 0,
  previousDisabled: true,
  nextDisabled: true
}

export const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    setCommand: (state, action: PayloadAction<command>) => {
      state.command = action.payload
    },
    setTrans: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload
      state.offset = 0
      state.tabAr = action.payload.slice(0, PAGE_SIZE)
      state.nextDisabled = !(PAGE_SIZE < action.payload.length)
      state.previousDisabled = true
    },
    resetTrans: () => initialState,
    previousPage: (state) => {
      state.offset -= PAGE_SIZE
      state.tabAr = state.transactions.slice(state.offset, state.offset + PAGE_SIZE)
      state.nextDisabled = !((state.offset + PAGE_SIZE) < state.transactions.length)
      state.previousDisabled = state.offset <= 0
    },
    nextPage: (state) => {
      state.offset += PAGE_SIZE
      state.tabAr = state.transactions.slice(state.offset, state.offset + PAGE_SIZE)
      state.nextDisabled = !((state.offset + PAGE_SIZE) < state.transactions.length)
      state.previousDisabled = !(state.offset > 0)
    }
  }
})

export const { setCommand, setTrans, resetTrans, previousPage, nextPage } = transSlice.actions
export default transSlice.reducer
