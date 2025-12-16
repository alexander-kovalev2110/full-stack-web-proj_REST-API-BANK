// src/store/trans/transThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from "axios"
import { RootState } from '../../store'
import { openAlert } from "../alertSlice"
import { openLoading, closeLoading } from "../modalSlice"
import { setTrans } from './transSlice'
import { Query, ConfigArrType, Transactions } from "./transTypes"
import { Command } from '../interfaces'

// Basic async thunk
export const fetchTrans = createAsyncThunk<
  void,                // return type
  Query,               // input data type (payload)
  { state: RootState } // thunkAPI.getState() typing
>(
  'trans/fetch',
  async (payload, { getState, dispatch }) => {
    const { transactionId, amount, date } = payload

    const state = getState()
    const command: Command = state.trans.command as Command
    const token = state.cust.token

    const domen = 'http://127.0.0.1:8000/transaction'

    const config: ConfigArrType = {
      [Command.AddTrans]: { method: 'POST', url: `${domen}`, data: { amount } },
      [Command.GetTrans]: { method: 'GET', url: `${domen}/${transactionId}` },
      [Command.GetTransByFilter]: { method: 'GET', url: `${domen}`, params: { amount, date } },
      [Command.UpdateTrans]: { method: 'PATCH', url: `${domen}/${transactionId}`, data: { amount } },
      [Command.delTrans]: { method: 'DELETE', url: `${domen}/${transactionId}` }
    }

    try {
      dispatch(openLoading()); // Show spinner

      const res: AxiosResponse<Transactions> = await axios({
        ...config[command],
        headers: { Authorization: `Bearer ${token}` }
      })
      
      dispatch(setTrans(res.data.transactions))

    } catch (err: any) {
      const status = err?.response?.status
      const msg = status >= 500 ? err.message : err?.response?.data?.error
      dispatch(openAlert(msg))
    } finally {
      dispatch(closeLoading()); // Hide spinner
    }
  }
)
