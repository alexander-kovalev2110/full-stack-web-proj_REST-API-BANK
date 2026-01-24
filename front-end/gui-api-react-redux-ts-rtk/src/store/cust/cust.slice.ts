// store/cust/custSlice.ts
import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { CustState } from "./cust.types"
import { loginCust, registerCust } from "./cust.thunks"

const initialState: CustState = {
  username: null,
}

export const custSlice = createSlice({
  name: "cust",
  initialState,
  reducers: {
    resetCust: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(loginCust.fulfilled, registerCust.fulfilled),
      (state, action) => {
        state.username = action.payload.username
      }
    )
  },
})

export const { resetCust } = custSlice.actions
export default custSlice.reducer
