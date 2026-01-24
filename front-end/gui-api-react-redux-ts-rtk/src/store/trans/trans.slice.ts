// src/store/trans/transSlice.ts
import { createSlice } from "@reduxjs/toolkit"
import { TransState, Transactions } from "./trans.types"

const initialState: TransState = {
  transactions: [],
}

export const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    resetTrans: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is { payload: Transactions } =>
        action.type.startsWith("trans/") &&
        action.type.endsWith("/fulfilled"),

      (state, action) => {
        state.transactions = action.payload.transactions
      }
    )
  },
})

export const { resetTrans } = transSlice.actions
export default transSlice.reducer
