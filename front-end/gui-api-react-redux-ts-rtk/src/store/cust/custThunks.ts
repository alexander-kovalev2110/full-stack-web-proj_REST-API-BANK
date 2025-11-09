// store/cust/custThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { CustData, MyTokenPayload } from "./custTypes"
import { setCustomer, setName, setToken } from "./custSlice"
import { openLoading, closeLoading } from "../modalSlice"
import { openAlert } from "../alertSlice"
import { resetTrans } from "../trans"

// createAsyncThunk is automatically typed
export const fetchCust = createAsyncThunk(
  "cust/fetch",
  async (custData: CustData, { dispatch }) => {
    const { authorKind, name, pw } = custData
    const domen = "http://127.0.0.1:8000/customer"
    const url = authorKind === "Login" ? `${domen}/login` : `${domen}/register`
      
    try {
      dispatch(openLoading()); // Show spinner
      // 👇 Delay for 2 seconds for debugging
      // await new Promise(resolve => setTimeout(resolve, 2000))

      const res = await axios.post(url, { name, password: pw })
      const token: string = res.data?.token
      const decoded = jwtDecode<MyTokenPayload>(token)

      // Saving the state
      dispatch(setCustomer(decoded.customerId))
      dispatch(setName(decoded.username))
      dispatch(setToken(token))
      dispatch(resetTrans())

      return token
    } catch (err: any) {
      const message = err.response?.data?.error || err.message
      dispatch(openAlert(message))
    } finally {
      dispatch(closeLoading()); // Hide spinner
    }
  }
)
