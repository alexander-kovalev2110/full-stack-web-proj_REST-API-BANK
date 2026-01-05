// src/store/trans/transThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { TransQuery, Transactions } from "./transTypes"
import { axiosInstance } from "../api/axiosInstance"
import { buildTransRequest } from "../api/transApi"
import { parseAxiosError} from "../api/parseAxiosError"

export const fetchTrans = createAsyncThunk<
  Transactions,             // returned data
  TransQuery,               // seach arguments
  { rejectValue: string }   // type of error
>(
  "trans/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const requestConfig = buildTransRequest(
        payload
      )

      const response = await axiosInstance(requestConfig)
      return response.data

    } catch (err: unknown) {
      return rejectWithValue(parseAxiosError(err))
    }
  })
