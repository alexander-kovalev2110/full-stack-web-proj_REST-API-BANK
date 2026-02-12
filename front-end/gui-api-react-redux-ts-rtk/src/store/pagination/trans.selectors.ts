// src/store/trans/transSelectors.ts
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from ".."
import { Transaction } from "../../infrastructure/api/trans/trans.types"

// Paginated transactions
export const selectPaginatedTransactions = createSelector(
  [
    (state: RootState) => state.trans.transactions,
    (state: RootState) => state.pagination.page,
    (state: RootState) => state.pagination.pageSize,
  ],
    (
    transactions: Transaction[],
    page: number,
    pageSize: number
  ): Transaction[] => {
    const start = page * pageSize
    const end = start + pageSize
    return transactions.slice(start, end)
  }
)

// Pagination UI state
export const selectPaginationState = createSelector(
  [
    (state: RootState) => state.pagination.page,
    (state: RootState) => state.pagination.pageSize,
    (state: RootState) => state.trans.transactions.length,
  ],
  (page, pageSize, length) => ({
    previousDisabled: page === 0,
    nextDisabled: (page + 1) * pageSize >= length,
  })
)
