// src/store/trans/trans.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { TransactionsResponse } from "../../infrastructure/api/trans/trans.types"
import { transApi } from "../../infrastructure/api/trans/trans.api"
import { RootState } from ".."
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

export const fetchTransactionsByFilter = createAsyncThunk(
  "trans/fetchByFilter",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const { page, pageSize, filter } = state.trans

      return await transApi.getByFilter({
        ...filter,
        page: page + 1,      // 🔥 Important
        limit: pageSize,
      })

    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)


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
