// src/store/trans/transTypes.ts
import { Transaction } from "../../infrastructure/api/trans/trans.types"

// Type of state
export type TransState = {
  transactions: Transaction[]
}


