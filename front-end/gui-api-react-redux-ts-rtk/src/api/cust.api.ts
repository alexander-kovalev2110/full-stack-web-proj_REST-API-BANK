// src/api/cust.api.ts
import { axiosPublic } from "./axiosPublic"
import { CustRequest, CustResponse } from "../store/cust/cust.types"

export const authApi = {
  async login(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosPublic.post<CustResponse>("/customer/login", cust)
    return data
  },

  async register(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosPublic.post<CustResponse>("/customer/register", cust)
    return data
  },
}

