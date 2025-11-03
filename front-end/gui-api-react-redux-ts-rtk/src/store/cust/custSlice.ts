// store/cust/custSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CustState } from './custTypes'

const initialState: CustState = {
  customerId: null,
  token: null,
}

export const custSlice = createSlice({
  name: "cust",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<number>) => {
      state.customerId = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    resetCust: () => initialState,
  },
})

export const { setCustomer, setToken, resetCust } = custSlice.actions
export default custSlice.reducer
