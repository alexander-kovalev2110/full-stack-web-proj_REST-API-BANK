// store/listeners/event.listeners.ts
import { createListenerMiddleware } from "@reduxjs/toolkit"
import { fetchCust } from "../cust"
import { fetchTrans} from "../trans"
import { resetTrans } from "../trans"
import { resetPagination } from "../pagination/pagination.slice"
import { resetCust } from "../cust"

export const authListenerMiddleware = createListenerMiddleware()
const listener = authListenerMiddleware.startListening

/* ================================
   LOGIN / REGISTER SUCCESS
================================ */
listener({
  actionCreator: fetchCust.fulfilled,
  effect: async (action, api) => {
    // save token
    localStorage.setItem("token", action.payload.token)

    // clear old bases
    api.dispatch(resetTrans())
  },
})

/* ================================
   LOGOUT
================================ */
listener({
  actionCreator: resetCust,
  effect: async (_, api) => {
    // remove token
    localStorage.removeItem("token")

    // clear associated domains
    api.dispatch(resetTrans())
  },
})

/* ================================
   NEW COMMAND
================================ */
// clear pagination data
listener({
  actionCreator: fetchTrans.fulfilled,
  effect: (_, api) => {
    api.dispatch(resetPagination())
  },
})