import { createSlice } from "@reduxjs/toolkit"
import { CustState } from "./cust.types"

const initialState: CustState = {
  username: null,
}

export const custSlice = createSlice({
  name: "cust",
  initialState,
  reducers: {
    resetCust: () => initialState,
    
    setUsername: (state, action: { payload: string }) => {
      state.username = action.payload
    },
  },
})

export const { resetCust, setUsername } = custSlice.actions
export default custSlice.reducer
