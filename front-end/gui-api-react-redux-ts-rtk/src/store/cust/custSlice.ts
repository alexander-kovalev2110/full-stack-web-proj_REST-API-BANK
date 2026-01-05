// store/cust/custSlice.ts
import { createSlice } from "@reduxjs/toolkit"
import { CustState } from "./custTypes"
import { fetchCust } from "./custThunks"

const initialState: CustState = {
  username: null
}

export const custSlice = createSlice({
  name: "cust",
  initialState,
  reducers: {
    resetCust: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCust.fulfilled, (state, action) => {
      state.username = action.payload.username
    })
  },
})

export const { resetCust } = custSlice.actions
export default custSlice.reducer
