// store/listeners/event.listeners.ts
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import {
  loginCust,
  registerCust,
  resetCust,
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

export const authListenerMiddleware = createListenerMiddleware()
const listener = authListenerMiddleware.startListening

/* ================================
   LOGIN / REGISTER SUCCESS
================================ */
type AuthSuccessAction =
  | ReturnType<typeof loginCust.fulfilled>
  | ReturnType<typeof registerCust.fulfilled>

listener({
  matcher: isAnyOf(
    loginCust.fulfilled,
    registerCust.fulfilled
  ),
  effect: async (action: AuthSuccessAction, api) => {
    localStorage.setItem("token", action.payload.token)
    api.dispatch(resetTrans())
  },
})

/* ================================
   LOGOUT
================================ */
listener({
  actionCreator: resetCust,
  effect: async (_, api) => {
    localStorage.removeItem("token")
    api.dispatch(resetTrans())
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

