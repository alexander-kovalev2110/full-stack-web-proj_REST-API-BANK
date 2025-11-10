// store/cust/custTypes.ts
import { JwtPayload } from "jwt-decode"
import { AuthorKind } from '../interfaces'

// Types for exchange with "Customer" DB
export type Token = string | null
export type UserName = string | null

export type CustData = {            // Type of request
    authorKind: AuthorKind,
    name: string, 
    pw: string
}

export type CustState = {            // Type of response
    username: UserName,
    token: Token
}

export interface MyTokenPayload extends JwtPayload {
  username: string
}
