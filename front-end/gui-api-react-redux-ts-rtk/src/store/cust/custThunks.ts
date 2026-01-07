// store/cust/custThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

import { CustData, MyTokenPayload } from "./custTypes"
import { authApi } from "../api/custApi"
import { parseAxiosError} from "../api/parseAxiosError"
import { AuthorKind } from '../interfaces'

export const fetchCust = createAsyncThunk<
  { token: string, username: string },  // returned data
  CustData,                             // seach arguments
  { rejectValue: string }               // type of error
>(
  "cust/fetch",
  async ({ authorKind, name, pw }, { rejectWithValue }) => {
    try {
      const response =
        authorKind === AuthorKind.Login
          ? await authApi.login(name, pw)
          : await authApi.register(name, pw)

      const token = response.data.token
      const decoded = jwtDecode<MyTokenPayload>(token)

      if (!decoded.username) {
        return rejectWithValue("Invalid token payload")
      }

      return {
        token,
        username: decoded.username
      }
    } catch (err: unknown) {
      return rejectWithValue(parseAxiosError(err))
    }
  }
)
