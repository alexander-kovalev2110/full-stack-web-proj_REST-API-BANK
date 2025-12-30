// src/store/trans/transThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../store"
import { Query, Transactions, ConfigArrType } from "./transTypes"
import { Command } from "../interfaces"

export const fetchTrans = createAsyncThunk<
  Transactions,        // returned data
  Query,               // payload
  { state: RootState; rejectValue: string }
>(
  "trans/fetch",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { transactionId, amount, date } = payload
      const state = getState()

      const command = state.trans.command as Command
      const token = state.cust.token

      if (!token) {
        return rejectWithValue("Unauthorized")
      }

      const domen = "http://127.0.0.1:8000/transaction"
      const domenFilter = "http://127.0.0.1:8000/transactions"

      const config: ConfigArrType = {
        [Command.AddTrans]: { method: 'POST', url: `${domen}`, data: { amount } },
        [Command.GetTrans]: { method: 'GET', url: `${domen}/${transactionId}` },
        [Command.GetTransByFilter]: { method: 'GET', url: `${domenFilter}`, params: { amount, date } },
        [Command.UpdateTrans]: { method: 'PATCH', url: `${domen}/${transactionId}`, data: { amount } },
        [Command.delTrans]: { method: 'DELETE', url: `${domen}/${transactionId}` }
      }

      const res = await axios({
        ...config[command],
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.data

    } catch (err: any) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Request failed"

      return rejectWithValue(message)
    }
  }
)
