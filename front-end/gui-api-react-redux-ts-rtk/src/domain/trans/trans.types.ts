// domain/trans/trans.types.ts
export type Transaction = {
  id: string
  amount: number
  date: string
}

export type TransactionFilter = {
  amount?: number
  date?: string
}
