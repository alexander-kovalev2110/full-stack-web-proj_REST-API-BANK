// src/store/trans/trans.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Transactions } from "./trans.types"
import { transApi } from "../../api/trans.api"
import { ApiError, handleApiError } from "../shared/handleApiError"

/** Create transaction */
export const createTransaction = createAsyncThunk<
  Transactions,
  { amount: number },
  { rejectValue: ApiError }
>("trans/create", async ({ amount }, { rejectWithValue }) => {
  try {
    return await transApi.create(amount)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Transaction creation failed")
    )
  }
})

/** Get transaction by id */
export const fetchTransactionById = createAsyncThunk<
  Transactions,
  { id: string },
  { rejectValue: ApiError }
>("trans/fetchById", async ({ id }, { rejectWithValue }) => {
  try {
    return await transApi.getById(id)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Failed to fetch transaction")
    )
  }
})

/** Get transactions by filter */
export const fetchTransactionsByFilter = createAsyncThunk<
  Transactions,
  { amount: number; date: string },
  { rejectValue: ApiError }
>("trans/fetchByFilter", async (payload, { rejectWithValue }) => {
  try {
    return await transApi.getByFilter(payload)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Failed to fetch transactions")
    )
  }
})

/** Update transaction */
export const updateTransaction = createAsyncThunk<
  Transactions,
  { id: string; amount: number },
  { rejectValue: ApiError }
>("trans/update", async ({ id, amount }, { rejectWithValue }) => {
  try {
    return await transApi.update(id, amount)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Transaction update failed")
    )
  }
})

/** Delete transaction */
export const deleteTransaction = createAsyncThunk<
  Transactions,
  { id: string },
  { rejectValue: ApiError }
>("trans/delete", async ({ id }, { rejectWithValue }) => {
  try {
    return await transApi.remove(id)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Transaction delete failed")
    )
  }
})
