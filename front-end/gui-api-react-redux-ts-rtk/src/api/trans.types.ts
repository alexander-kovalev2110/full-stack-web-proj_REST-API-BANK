// src/api/trans.types.ts

export type Transaction = {
  transactionId: number
  amount: number
  date: string
}

export type TransactionsResponse = {
  transactions: Transaction[]
}

