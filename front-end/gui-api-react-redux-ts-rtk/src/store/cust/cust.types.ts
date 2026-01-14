// store/cust/custTypes.ts
import { JwtPayload } from "jwt-decode"
import { AuthorKind } from '../../shared/interfaces'
import { CustRequest } from "../../api/cust.api"

export type CustThunkArgs = CustRequest & {
  authorKind: AuthorKind
}

export type CustState = {
  username: string | null
}

export interface MyTokenPayload extends JwtPayload {
  username?: string
}
