// src/store/cust/cust.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { authApi } from "../../api/cust.api"
import { CustRequest } from "./cust.types"
import { parseAuthToken } from "./parseAuthResponse"
import { ApiError, handleApiError } from "../shared/handleApiError"

/** Login */
export const loginCust = createAsyncThunk<
  { token: string; username: string },
  CustRequest,
  { rejectValue: ApiError }
>("cust/login", async (payload, { rejectWithValue }) => {
  try {
    const { token } = await authApi.login(payload)
    return parseAuthToken(token)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Login failed")
    )
  }
})

/** Register */
export const registerCust = createAsyncThunk<
  { token: string; username: string },
  CustRequest,
  { rejectValue: ApiError }
>("cust/register", async (payload, { rejectWithValue }) => {
  try {
    const { token } = await authApi.register(payload)
    return parseAuthToken(token)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Register failed")
    )
  }
})
