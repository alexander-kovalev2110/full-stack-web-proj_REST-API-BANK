import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { store } from './store'
import { openAlert } from "./alertSlice"
import axios, { AxiosResponse } from "axios"
import { command, Command, Transaction, Transactions } from './interfaces'

export type Query = {
    transactionId: number,
    amount: number,
    date: Date
}

type Config = {
    method: string,
    url: string
}

type ConfigArrType = {
    [key in Command]: Config
}

export const fetchTrans = createAsyncThunk(
    'trans/fetch',
    async (payload: Query) => {    
    const { transactionId, amount, date } = payload

    const command: Command = store.getState().trans.command as Command
    const customerId = store.getState().cust.customerId

    const domen = 'http://127.0.0.1:8000/transaction'

    // Data for request to Transaction DB (method, url)
    const config: ConfigArrType = {
        [Command.AddTrans]: { method: 'POST', url: `${domen}/${customerId}/${amount}` },
        [Command.GetTrans]: { method: 'GET', url: `${domen}/${customerId}/${transactionId}` },
        [Command.GetTransByFilter]: { method: 'GET', url: `${domen}/${customerId}/?amount=${amount}&date=${date}` },
        [Command.UpdateTrans]: { method: 'PATCH', url: `${domen}/${customerId}/${transactionId}/${amount}` },
        [Command.delTrans]:  { method: 'DELETE', url: `${domen}/${customerId}/${transactionId}` }
    }

    try {
        const res: AxiosResponse<Transactions> = await axios(config[command])
        store.dispatch(setTrans(res.data.transactions)) 
    }
    catch (err: any) {
        if (err.response.status > 400) { store.dispatch(openAlert(err.message)) }
        else { store.dispatch(openAlert(err.response.data.errMessage)) }
    }
})

const page = 5

type TransState = {
    command: command
    transactions: Transaction[],
    tabAr: Transaction[],
    offset: number,
    previousDisabled: boolean,
    nextDisabled: boolean
}

const initialState: TransState = {
    command: '',
    transactions: [],
    tabAr: [],
    offset: 0,
    previousDisabled: true,
    nextDisabled: true
}

export const transSlice = createSlice({
    name: 'trans',
    initialState,
    reducers: {
      setCommand: (state, action: PayloadAction<command>) => {
        state.command = action.payload
      },
      setTrans: (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload
        state.offset = 0
        state.tabAr = action.payload.filter((el, index) =>
            ((index >= 0) && (index < page)))
        state.nextDisabled = !(page < action.payload.length)
        state.previousDisabled = true
      },
      resetTrans: () => {
        return initialState;
      },
      previousPage: (state) => {
        state.offset = state.offset - page
        state.tabAr = state.transactions.filter((el, index) =>
            ((index >= state.offset ) && (index < state.offset  + page)))
        state.nextDisabled = !((state.offset  + page) < state.transactions.length)
        state.previousDisabled = !(state.offset  > 0) 
      },
      nextPage: (state) => {
        state.offset = state.offset + page
        state.tabAr = state.transactions.filter((el, index) =>
            ((index >= state.offset) && (index < state.offset + page)))
        state.nextDisabled = !((state.offset + page) < state.transactions.length)
        state.previousDisabled = !(state.offset > 0)
      }
    }
  })

  export const { setCommand, setTrans, resetTrans, previousPage, nextPage } = transSlice.actions

  export default transSlice.reducer
