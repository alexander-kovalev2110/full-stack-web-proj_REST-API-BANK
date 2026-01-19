// src/store/trans/transTypes.ts
import { Command, } from "../../shared/interfaces"
import { AxiosRequestConfig } from "axios"

// Types for exchange with "Trunsction" DB
export type Transaction = {
    transactionId: number,
    amount: number,
    date: Date
}

// export type Transactions = Transaction[]
export type Transactions = {
  transactions: Transaction[]
}

// Mapping commands to axios configs
export type ConfigArrType = { [key in Command]: AxiosRequestConfig }

// Type of state
export type TransState = {
  transactions: Transaction[]
}


