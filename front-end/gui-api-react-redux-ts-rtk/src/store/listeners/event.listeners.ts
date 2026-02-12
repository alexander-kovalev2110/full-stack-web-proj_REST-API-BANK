// store/listeners/event.listeners.ts
import { createListenerMiddleware, isAnyOf, PayloadAction  } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

import {
  loginCust,
  registerCust,
  resetCust,
  setUsername,
} from "../cust"

import {
  fetchTransactionsByFilter,
  fetchTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  resetTrans,
} from "../trans"

import { resetPagination } from "../pagination/pagination.slice"

import { CustResponse } from "../../infrastructure/api/cust/cust.types"
import { tokenStorage } from "../../infrastructure/storage/token.storage"

type JwtPayload = {
  username: string
}

export const authListenerMiddleware = createListenerMiddleware()
const listener = authListenerMiddleware.startListening

/* ================================
   LOGIN / REGISTER SUCCESS
================================ */
listener({
  matcher: isAnyOf(
    loginCust.fulfilled,
    registerCust.fulfilled
  ),
  effect: async (
    action: PayloadAction<CustResponse>,
    api
  ) => {
    const { token } = action.payload

    // 1. Save token
     tokenStorage.save(token)

    // 2. Decode username from token for UI
    const decoded = jwtDecode<JwtPayload>(token)
    api.dispatch(setUsername(decoded.username))

    // 3. Reset dependent state
    api.dispatch(resetTrans())
  },
})


/* ================================
   LOGOUT
================================ */
listener({
  actionCreator: resetCust,
  effect: async (_, api) => {
    tokenStorage.clear()          // Remove token
    api.dispatch(resetTrans())    // Reset dependent state
  },
})

/* ================================
   NEW COMMAND
================================ */
listener({
  matcher: isAnyOf(
    fetchTransactionsByFilter.fulfilled,
    fetchTransactionById.fulfilled,
    createTransaction.fulfilled,
    updateTransaction.fulfilled,
    deleteTransaction.fulfilled
  ),
  effect: async (_, api) => {
    api.dispatch(resetPagination())
  },
})

