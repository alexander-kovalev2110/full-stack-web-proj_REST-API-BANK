// src/infrastructure/api/cust/cust.types.ts
export type CustRequest = {
  name: string
  password: string
}

export type CustResponse = {
  token: string
}
