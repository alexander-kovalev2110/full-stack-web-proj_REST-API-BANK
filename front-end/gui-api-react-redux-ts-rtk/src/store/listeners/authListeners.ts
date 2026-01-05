// store/listeners/authListeners.ts
import { createListenerMiddleware } from "@reduxjs/toolkit"
import { fetchCust } from "../cust/custThunks"
import { fetchTrans} from "../trans/transThunks"
import { resetTrans } from "../trans"
import { resetPagination } from "../paginationSlice"
import { resetCust } from "../cust/custSlice"

export const authListenerMiddleware = createListenerMiddleware()
const listener = authListenerMiddleware.startListening

/* ================================
   LOGIN / REGISTER SUCCESS
================================ */
listener({
  actionCreator: fetchCust.fulfilled,
  effect: async (action, api) => {
    // 1️⃣ save token
    localStorage.setItem("token", action.payload.token)

    // 2️⃣ clear old transactions
    api.dispatch(resetTrans())
  },
})

/* ================================
   LOGOUT
================================ */
listener({
  actionCreator: resetCust,
  effect: async (_, api) => {
    // 1️⃣ remove token
    localStorage.removeItem("token")

    // 2️⃣ clear associated domains
    api.dispatch(resetTrans())
  },
})

/* ================================
   TRANSACTION REQUEST
================================ */
listener({
  actionCreator: fetchTrans.fulfilled,
  effect: (_, api) => {
    api.dispatch(resetPagination())
  },
})

