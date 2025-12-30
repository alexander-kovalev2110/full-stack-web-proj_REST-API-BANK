// src/store/trans/transSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTrans } from "./transThunks"
import { TransState } from "./transTypes"
import { command } from "../interfaces"

const initialState: TransState = {
  command: "",
  transactions: [],
}

export const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    setCommand: (state, action: PayloadAction<command>) => {
      state.command = action.payload
    },
    resetTrans: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrans.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions
    })
  }
})

export const { setCommand, resetTrans } = transSlice.actions
export default transSlice.reducer
