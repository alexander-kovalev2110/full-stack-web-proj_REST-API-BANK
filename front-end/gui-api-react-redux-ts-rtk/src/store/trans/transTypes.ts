import { Command, } from "../interfaces"
import { AxiosRequestConfig } from "axios"

// Types for exchange with "Trunsction" DB
export type Transaction = {
    transactionId: number,
    amount: number,
    date: Date
}

export type Transactions = {      // Type of response
    transactions: Transaction[]
}

// Input data for transaction search
export type Query = {
  transactionId?: number
  amount?: number
  date?: Date
}

// Mapping commands to axios configs
export type ConfigArrType = { [key in Command]: AxiosRequestConfig }

export type TransState = {
  command: Command | ""
  transactions: Transaction[]
  tabAr: Transaction[]
  offset: number
  previousDisabled: boolean
  nextDisabled: boolean
}

export const PAGE_SIZE = 5
