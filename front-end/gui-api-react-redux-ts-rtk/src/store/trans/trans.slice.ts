// src/store/trans/transSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import {
//   createTransaction,
//   fetchTransactionById,
//   fetchTransactionsByFilter,
//   updateTransaction,
//   deleteTransaction,
// } from "./trans.thunks"
// import { TransState, Transactions  } from "./trans.types"

// const initialState: TransState = {
//   transactions: [],
// }

// export const transSlice = createSlice({
//   name: "trans",
//   initialState,
//   reducers: {
//     resetTrans: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       // --------------------
//       // Create
//       // --------------------
//       .addCase(
//         createTransaction.fulfilled, 
//         (state, action: PayloadAction<Transactions>) => {
//           state.transactions = action.payload.transactions
//       })

//       // --------------------
//       // Fetch by id
//       // --------------------
//       .addCase(
//         fetchTransactionById.fulfilled, 
//         (state, action: PayloadAction<Transactions>) => {
//           state.transactions = action.payload.transactions
//       })

//       // --------------------
//       // Fetch by filter
//       // --------------------
//       .addCase(
//         fetchTransactionsByFilter.fulfilled, 
//         (state, action: PayloadAction<Transactions>) => {
//           state.transactions = action.payload.transactions
//       })

//       // --------------------
//       // Update
//       // --------------------
//       .addCase(
//         updateTransaction.fulfilled, 
//         (state, action: PayloadAction<Transactions>) => {
//           state.transactions = action.payload.transactions
//       })

//       // --------------------
//       // Delete
//       // --------------------
//       .addCase(
//         deleteTransaction.fulfilled, 
//         (state, action: PayloadAction<Transactions>) => {
//           state.transactions = action.payload.transactions
//       })
//   }
// })

// export const { resetTrans } = transSlice.actions
// export default transSlice.reducer

// src/store/trans/transSlice.ts
import { createSlice, isFulfilled } from "@reduxjs/toolkit"
import {
  createTransaction,
  fetchTransactionById,
  fetchTransactionsByFilter,
  updateTransaction,
  deleteTransaction,
} from "./trans.thunks"
import { TransState, Transactions } from "./trans.types"

const initialState: TransState = {
  transactions: [],
}

const fulfilledActions = [
  createTransaction.fulfilled,
  fetchTransactionById.fulfilled,
  fetchTransactionsByFilter.fulfilled,
  updateTransaction.fulfilled,
  deleteTransaction.fulfilled,
]

export const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    resetTrans: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(...fulfilledActions),
      (state, action) => {
        state.transactions = (action.payload as Transactions).transactions
      }
    )
  },
})

export const { resetTrans } = transSlice.actions
export default transSlice.reducer
