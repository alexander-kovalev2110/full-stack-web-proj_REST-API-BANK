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
 * ✅ Мемoизированный селектор
 * ✅ Возвращает стабильный объект
 * ✅ Убирает warning и лишние рендеры
 */
export const selectPaginationState = createSelector(
  [
    (state: RootState) => state.pagination.page,
    (state: RootState) => state.pagination.pageSize,
    (state: RootState) => state.trans.transactions.length,
  ],
  (page, pageSize, total) => ({
    previousDisabled: page === 0,
    nextDisabled: (page + 1) * pageSize >= total,
  })
)