// store/cust/custTypes.ts
import { JwtPayload } from "jwt-decode"
import { AuthorKind } from '../interfaces'

export type CustData = {            // Type of request
    authorKind: AuthorKind,
    name: string, 
    pw: string
}

export type AuthStatus = "idle" | "loading" | "authenticated" | "error"

export type CustState = {
  username: string | null
  token: string | null
}

export interface MyTokenPayload extends JwtPayload {
  username?: string
}
