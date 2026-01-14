// src/store/trans/trans.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { TransQuery, Transactions } from "./trans.types"
import { transApi } from "../../api/trans.api"
import { parseAxiosError } from "../../api/axios-error.parser"

export const fetchTrans = createAsyncThunk<
  Transactions,             // returned data (result)
  TransQuery,               // payload (arguments)
  { rejectValue: string }   // type of error
>(
  "trans/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await transApi.exec<Transactions>(payload)
      return response.data
    } catch (err: unknown) {
      return rejectWithValue(parseAxiosError(err))
    }
  }
)
