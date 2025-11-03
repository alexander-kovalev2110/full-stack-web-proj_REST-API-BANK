// store/cust/custThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { CustData, MyTokenPayload } from "./custTypes"
import { setCustomer, setToken } from "./custSlice"
import { openAlert } from "../alertSlice"
import { resetTrans } from "../trans"

// createAsyncThunk is automatically typed
export const fetchCust = createAsyncThunk(
  "cust/fetch",
  async (custData: CustData, { dispatch }) => {
    try {
      const { authorKind, name, pw } = custData
      const domen = "http://127.0.0.1:8000/customer"
      const url = authorKind === "Login" ? `${domen}/login` : `${domen}/register`

      const res = await axios.post(url, { name, password: pw })
      const token: string = res.data?.token
      const decoded = jwtDecode<MyTokenPayload>(token)

      // Saving the state
      dispatch(setCustomer(decoded.customerId))
      dispatch(setToken(token))
      dispatch(resetTrans())

      return token
    } catch (err: any) {
        console.log("err", err)
      const message = err.response?.data?.error || err.message
      dispatch(openAlert(message))
    }
  }
)
