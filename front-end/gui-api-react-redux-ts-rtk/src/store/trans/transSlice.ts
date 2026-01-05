// src/store/trans/transSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTrans } from "./transThunks"
import { TransState } from "./transTypes"
import { Command } from "../interfaces"

const initialState: TransState = {
  command: null,
  transactions: [],
}

export const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    setCommand: (state, action: PayloadAction<Command | null>) => {
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
