// src/store/trans/transTypes.ts

// Types for exchange with "Trunsction" DB
export type Transaction = {
    transactionId: number,
    amount: number,
    date: Date
}

export type Transactions = {
  transactions: Transaction[]
}

// Type of state
export type TransState = {
  transactions: Transaction[]
}


