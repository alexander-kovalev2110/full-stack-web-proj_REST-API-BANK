// src/store/trans/trans.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Transactions } from "./trans.types"
import { transApi } from "../../api/trans.api"

/** Создать транзакцию */
export const createTransaction = createAsyncThunk<
  Transactions,
  { amount: number }
>("trans/create", async ({ amount }) => {
  return transApi.create(amount)
})

/** Get transaction by id */
export const fetchTransactionById = createAsyncThunk<
  Transactions,
  { id: string }
>("trans/fetchById", async ({ id }) => {
  return transApi.getById(id)
})

/**Get transactions by filter */
export const fetchTransactionsByFilter = createAsyncThunk<
  Transactions,
  { amount: number; date: string }
>("trans/fetchByFilter", async ({ amount, date }) => {
  return transApi.getByFilter({ amount, date })
})

/** Update transaction */
export const updateTransaction = createAsyncThunk<
  Transactions,
  { id: string; amount: number }
>("trans/update", async ({ id, amount }) => {
  return transApi.update(id, amount)
})

/** Delete transaction */
export const deleteTransaction = createAsyncThunk<
  Transactions,
  { id: string }
>("trans/delete", async ({ id }) => {
  return transApi.remove(id)
})

