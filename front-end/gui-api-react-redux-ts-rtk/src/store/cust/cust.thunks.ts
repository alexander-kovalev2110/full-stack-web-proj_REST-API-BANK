// src/store/cust/cust.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { authApi } from "../../api/cust.api"
import { CustRequest, CustResponse } from "../../api/cust.types"
import { ApiError, handleApiError } from "../store-shared/handleApiError"

// Login 
export const loginCust = createAsyncThunk<
  CustResponse,
  CustRequest,
  { rejectValue: ApiError }
>("cust/login", async (payload, { rejectWithValue }) => {
  try {
    return await authApi.login(payload)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Login failed")
    )
  }
})

// Register 
export const registerCust = createAsyncThunk<
  CustResponse,
  CustRequest,
  { rejectValue: ApiError }
>("cust/register", async (payload, { rejectWithValue }) => {
  try {
    return await authApi.register(payload)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Register failed")
    )
  }
})

