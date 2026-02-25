// src/store/trans/trans.slice.ts
import { createSlice, PayloadAction, isAnyOf } from "@reduxjs/toolkit"
import { TransState } from "./trans.types"
import {
  fetchTransactionsByFilter,
  createTransaction,
  fetchTransactionById,
  updateTransaction,
  deleteTransaction,
} from "./trans.thunks"
import { TransactionsResponse } from "../../infrastructure/api/trans/trans.types"

const PAGE_SIZE = 5

const initialState: TransState = {
  transactions: [],
  total: 0,
  page: 0,
  pageSize: PAGE_SIZE,
  filter: {
    amount: undefined,
    date: undefined,
  },
}

export const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    resetTrans: () => initialState,

    setFilter: (state, action: PayloadAction<{
      amount?: number
      date?: string
    }>) => {
      state.filter = action.payload
      state.page = 0      // With a new filter, we reset the page
    },

    nextPage: (state) => {
      state.page++
    },

    previousPage: (state) => {
      state.page--
    },
  },

  extraReducers: (builder) => {
    // =====================================
    // PAGINATION (ONLY THIS HAS SPECIAL LOGIC)
    // =====================================
    builder.addCase(
      fetchTransactionsByFilter.fulfilled,
      (state, action: PayloadAction<TransactionsResponse>) => {
        state.transactions = action.payload.transactions
        state.total = action.payload.total
        state.page = action.payload.page - 1   // 🔥 Important
        state.pageSize = action.payload.limit
      }
    )

    // =====================================
    // ALL OTHER CRUD METHODS (COMMON LOGIC)
    // =====================================
    builder.addMatcher(
      isAnyOf(
        createTransaction.fulfilled,
        fetchTransactionById.fulfilled,
        updateTransaction.fulfilled,
        deleteTransaction.fulfilled
      ),
      (state, action: PayloadAction<TransactionsResponse>) => {
        state.transactions = action.payload.transactions
        // state.total = action.payload.total ?? state.total
      }
    )
  },
})

export const { resetTrans, setFilter, previousPage, nextPage } = transSlice.actions
// export const { resetTrans, setFilter, previousPage, nextPage, resetPagination } = transSlice.actions
export default transSlice.reducer
