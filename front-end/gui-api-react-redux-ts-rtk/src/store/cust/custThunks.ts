// store/cust/custThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

import { CustData, MyTokenPayload } from "./custTypes"
import { authApi } from "../api/authApi"
import { resetTrans } from "../trans"

export const fetchCust = createAsyncThunk<
  { token: string; username: string },
  CustData,
  { rejectValue: string }
>(
  "cust/fetch",
  async ({ authorKind, name, pw }, { dispatch, rejectWithValue }) => {
    try {
      const response =
        authorKind === "Login"
          ? await authApi.login(name, pw)
          : await authApi.register(name, pw)

      const token = response.data.token
      const decoded = jwtDecode<MyTokenPayload>(token)

      if (!decoded.username) {
        return rejectWithValue("Invalid token payload")
      }

      dispatch(resetTrans())

      return {
        token,
        username: decoded.username,
      }
    } catch (err: unknown) {
      let message = "Unexpected error"

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.error ?? err.message
      }

      return rejectWithValue(message)
    }
  }
)
