import { createSlice } from "@reduxjs/toolkit"

export const custSlice = createSlice({
    name: 'cust',
    initialState: {
      customerId: null
    },
    reducers: {
        authorCustomer: (state, action) => {
            state.customerId = action.payload
        },
    },
})

export const { authorCustomer } = custSlice.actions

export default custSlice.reducer
