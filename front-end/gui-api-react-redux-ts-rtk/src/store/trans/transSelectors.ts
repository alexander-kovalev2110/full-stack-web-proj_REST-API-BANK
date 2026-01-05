// src/store/trans/transSelectors.ts
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store"

export const selectPaginatedTransactions = createSelector(
  [
    (state: RootState) => state.trans.transactions,
    (state: RootState) => state.pagination.page,
    (state: RootState) => state.pagination.pageSize,
  ],
  (transactions, page, pageSize) =>
    transactions.slice(page * pageSize, (page + 1) * pageSize)
)

/**
 * Memoized selector
 * Returns a stable object
 * Removes warnings and unnecessary renderings
 */
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