// store/cust/custSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CustState } from './custTypes'

const initialState: CustState = {
  username: null,
  token: null,
}

export const custSlice = createSlice({
  name: "cust",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.username= action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    resetCust: () => initialState,
  },
})

export const { setName, setToken, resetCust } = custSlice.actions
export default custSlice.reducer
