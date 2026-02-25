// src/store/trans/transSelectors.ts
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from ".."

// Paginated transactions
export const selectPaginatedTransactions = 
  (state: RootState) => state.trans.transactions

// Pagination UI state
export const selectPaginationState = createSelector(
  [
    (state: RootState) => state.trans.page,
    (state: RootState) => state.trans.pageSize,
    (state: RootState) => state.trans.total,
  ],
  (page, pageSize, total) => ({
    previousDisabled: page === 0,
    nextDisabled: (page + 1) * pageSize >= total,
    page: page
  })
)
