// Commonly used data types

// Basic type for Actions
export interface BaseAction<ActionTypes, Payload> {
    type: ActionTypes
    payload?: Payload
}

// Types of authorization (Navbar menu buttons)
export type AuthorKind = 'Login' | 'Signup' | '' | undefined 

// Types for exchange with "Customer" DB
export type Customer = {            // Type of response
    customerId: CustomerId
}

export type CustomerId = number | null | undefined

// Types for exchange with "Trunsction" DB
export type Transactions = {        // Type of response
    transactions: Transaction[]
}

export type Transaction = {
    transactionId: number,
    amount: number,
    date: Date
}

// Types used when working with menu command
export enum Command {
    AddTrans = 'Add Transaction',
    GetTrans = 'Get Transaction',
    GetTransByFilter = 'Get Transaction by Filter',
    UpdateTrans = 'Update Transaction',
    delTrans = 'Delete Transaction',
}

export type command = Command | ''
