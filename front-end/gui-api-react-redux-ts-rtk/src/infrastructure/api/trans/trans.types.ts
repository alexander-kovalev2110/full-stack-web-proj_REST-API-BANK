// src/infrastructure/api/trans.types.ts

export type Transaction = {
  transactionId: string
  amount: number
  date: string
}

export type TransactionsResponse = {
  transactions: Transaction[]
  total: number
}

