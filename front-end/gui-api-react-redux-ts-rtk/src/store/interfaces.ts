// Commonly used data types

// Basic type for Actions
export interface BaseAction<ActionTypes, Payload> {
    type: ActionTypes
    payload?: Payload
}

// Types of authorization (Navbar menu buttons)
export type AuthorKind = 'Login' | 'Signup' 
// export enum AuthorKind {
//   Login = "Login",
//   Register = "Signup",
// }


// Types used when working with menu command
export enum Command {
    AddTrans = 'Add Transaction',
    GetTrans = 'Get Transaction',
    GetTransByFilter = 'Get Transaction by Filter',
    UpdateTrans = 'Update Transaction',
    delTrans = 'Delete Transaction',
}

export type command = Command | ''
