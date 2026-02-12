// src/store/cust/cust.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { custApi } from "../../infrastructure/api/cust/cust.api"
import { CustRequest, CustResponse } from "../../infrastructure/api/cust/cust.types"
import { handleApiError } from "../../infrastructure/api/error/handleApiError"
import { validateRegister } from "../../domain/cust/cust.rules"

// Login 
export const loginCust = createAsyncThunk<
  CustResponse,
  CustRequest,      // payload
  { rejectValue: string }
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
  { rejectValue: string }
>("cust/register", async (payload, { rejectWithValue }) => {
  // DOMAIN RULE
  const error = validateRegister(payload)
  if (error) {
    return rejectWithValue(error)
    }

  try {
    return await custApi.register(payload)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Register failed")
    )
  }
})

