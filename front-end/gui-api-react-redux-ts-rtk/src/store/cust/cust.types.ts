// store/cust/custTypes.ts
import { JwtPayload } from "jwt-decode"
import { AuthorAction } from '../../shared/ui-actions'

export type CustResponse = {
  token: string
}

export type CustRequest = {
  name: string
  password: string
}

export type CustState = {
  username: string | null
}

export interface MyTokenPayload extends JwtPayload {
  username?: string
}
