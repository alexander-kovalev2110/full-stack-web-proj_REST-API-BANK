// src/store/cust/lib/parseAuthResponse.ts
import { jwtDecode } from "jwt-decode"
import { MyTokenPayload } from "./cust.types"

export function parseAuthToken(token: string): {
  token: string
  username: string
} {
  const decoded = jwtDecode<MyTokenPayload>(token)

  if (!decoded.username) {
    throw new Error("Invalid token payload: username is missing")
  }

  return {
    token,
    username: decoded.username,
  }
}
