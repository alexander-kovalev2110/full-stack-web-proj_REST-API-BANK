// domain/trans/trans.rules.ts
export const validateAmount = (amount: number): string | null =>
  amount > 0 ? null : "Amount must be greater than 0"

