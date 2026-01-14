// src/store/trans/transTypes.ts
import { Command, } from "../../shared/interfaces"
import { AxiosRequestConfig } from "axios"

// Types for exchange with "Trunsction" DB
export type Transaction = {
    transactionId: number,
    amount: number,
    date: Date
}

// Type of response
export type Transactions = { 
    transactions: Transaction[]
}

// Input data for BASE search  
export type TransQuery = {
  command: Command
  transactionId?: number
  amount?: number
  date?: string
}

// Mapping commands to axios configs
export type ConfigArrType = { [key in Command]: AxiosRequestConfig }

// Type of state
export type TransState = {
  command: Command | null
  transactions: Transaction[]
}

