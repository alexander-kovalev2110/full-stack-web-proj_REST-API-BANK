// src/store/trans/trans.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { TransactionsResponse } from "../../infrastructure/api/trans/trans.types"
import { transApi } from "../../infrastructure/api/trans/trans.api"
import { handleApiError } from "../../infrastructure/api/error/handleApiError"
import { validateAmount } from "../../domain/trans/trans.rules"

// Create transaction
export const createTransaction = createAsyncThunk<
  TransactionsResponse,
  { amount: number },
  { rejectValue: string }
>("trans/create", async ({ amount }, { rejectWithValue }) => {
  // Domain rule
  const error = validateAmount(amount)
  if (error) {
    return rejectWithValue(error)
  }

  try {
    return await transApi.create(amount)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Transaction creation failed")
    )
  }
})

// Get transaction by id
export const fetchTransactionById = createAsyncThunk<
  TransactionsResponse,
  { id: string },
  { rejectValue: string }
>("trans/fetchById", async ({ id }, { rejectWithValue }) => {
  try {
    return await transApi.getById(id)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Failed to fetch transaction")
    )
  }
})

// Get transactions by filter
export const fetchTransactionsByFilter = createAsyncThunk<
  TransactionsResponse,
  { amount: number; date: string },
  { rejectValue: string }
>("trans/fetchByFilter", async (payload, { rejectWithValue }) => {
  // Domain rule
  if (payload.amount !== undefined) {
    const error = validateAmount(payload.amount)
    if (error) {
      return rejectWithValue(error)
    }
  }

  try {
    return await transApi.getByFilter(payload)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Failed to fetch transactions")
    )
  }
})

// Update transaction
export const updateTransaction = createAsyncThunk<
  TransactionsResponse,
  { id: string; amount: number },
  { rejectValue: string }
>("trans/update", async ({ id, amount }, { rejectWithValue }) => {
  // Domain rule
  const error = validateAmount(amount)
  if (error) {
    return rejectWithValue(error)
  }

  try {
    return await transApi.update(id, amount)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Transaction update failed")
    )
  }
})

// Delete transaction
export const deleteTransaction = createAsyncThunk<
  TransactionsResponse,
  { id: string },
  { rejectValue: string }
>("trans/delete", async ({ id }, { rejectWithValue }) => {
  try {
    return await transApi.remove(id)
  } catch (err) {
    return rejectWithValue(
      handleApiError(err, "Transaction delete failed")
    )
  }
})
