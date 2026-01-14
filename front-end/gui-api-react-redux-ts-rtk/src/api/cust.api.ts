// src/api/cust.api.ts
import { axiosInstance } from "./axiosInstance"

export type CustResponse = {
  token: string
}

export type CustRequest = {
  name: string,
  password: string
}

const CUSTOMER = "/customer"

export const authApi = {
  login(payload: CustRequest) {
    return axiosInstance.post<CustResponse>(`${CUSTOMER}/login`, payload)
  },

  register(payload: CustRequest) {
    return axiosInstance.post<CustResponse>(`${CUSTOMER}/register`, payload)
  },
}
