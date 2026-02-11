// src/store/cust/cust.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { custApi } from "../../api/cust.api"
import { CustRequest, CustResponse } from "../../api/cust.types"
import { ApiError, handleApiError } from "../store-shared/handleApiError"

// Login 
export const loginCust = createAsyncThunk<
  CustResponse,
  CustRequest,      // payload
  { rejectValue: ApiError }
>("cust/login", async (payload, { rejectWithValue }) => {
  try {
    return await custApi.login(payload)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Login failed")
    )
  }
})

// Register 
export const registerCust = createAsyncThunk<
  CustResponse,
  CustRequest,      // payload
  { rejectValue: ApiError }
>("cust/register", async (payload, { rejectWithValue }) => {
  try {
    return await custApi.register(payload)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Register failed")
    )
  }
})

