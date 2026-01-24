// src/store/cust/cust.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { authApi, CustRequest } from "../../api/cust.api"
import { parseAuthToken } from "./parseAuthResponse"

/** Login */
export const loginCust = createAsyncThunk<
  { token: string; username: string },
  CustRequest
>("cust/login", async (payload) => {
  const response = await authApi.login(payload)
  return parseAuthToken(response.data.token)
})

/** Register */
export const registerCust = createAsyncThunk<
  { token: string; username: string },
  CustRequest
>("cust/register", async (payload) => {
  const response = await authApi.register(payload)
  return parseAuthToken(response.data.token)
})
