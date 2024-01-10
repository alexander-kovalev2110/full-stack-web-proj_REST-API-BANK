import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from "axios"
import { Customer, CustomerId, CustData } from './interfaces'
import { store } from './store'
import { openAlert } from './alertSlice'
import { resetTrans } from './transSlice'

export const fetchCust = createAsyncThunk(
    'cust/fetch',
    async (custData: CustData) => {
    try {
        const { authorKind, name, pw } = custData
        const method = (authorKind === 'Login')? 'GET' : 'POST'      // Login / Signup
        const url = `http://127.0.0.1:8000/customer/${name}/${pw}`

        const res: AxiosResponse<Customer> = await axios({method: method, url: url})
        store.dispatch(authorCustomer(res.data.customerId))
        store.dispatch(resetTrans())
    } catch (err: any) {
        if (err.response.status > 400) store.dispatch(openAlert(err.message))
        else store.dispatch(openAlert(err.response.data.errMessage))
    }
})

const initialState: Customer = {
    customerId: null
}

export const custSlice = createSlice({
    name: 'cust',
    initialState,
    reducers: {
        authorCustomer: (state, action: PayloadAction<CustomerId>) => {
            state.customerId = action.payload  
        },
    }
  })

  export const { authorCustomer } = custSlice.actions

  export default custSlice.reducer
