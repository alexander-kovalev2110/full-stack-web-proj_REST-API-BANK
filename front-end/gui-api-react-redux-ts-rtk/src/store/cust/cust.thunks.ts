// store/cust/custThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

import { CustThunkArgs, MyTokenPayload } from "./cust.types"
import { authApi } from "../../api/cust.api"
import { parseAxiosError} from "../../api/axios-error.parser"
import { AuthorKind } from '../../shared/interfaces'
import { CustRequest } from "../../api/cust.api"

export const fetchCust = createAsyncThunk<
  { token: string, username: string },  // returned data (result)
  CustThunkArgs,                        // arguments
  { rejectValue: string }               // type of error
>(
  "cust/fetch",
  async ({ authorKind, name, password }, { rejectWithValue }) => {
    try {
      const payload: CustRequest = { name, password }

      const response =
        authorKind === AuthorKind.Login
          ? await authApi.login(payload)
          : await authApi.register(payload)

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
