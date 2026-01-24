// store/cust/custTypes.ts
import { JwtPayload } from "jwt-decode"
import { AuthorAction } from '../../shared/ui-actions'
import { CustRequest } from "../../api/cust.api"

export type CustThunkArgs = CustRequest & {
  authorAction: AuthorAction
}

export type CustState = {
  username: string | null
}

export interface MyTokenPayload extends JwtPayload {
  username?: string
}
