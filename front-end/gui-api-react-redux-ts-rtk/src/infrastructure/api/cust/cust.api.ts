// src/api/cust.api.ts
import { axiosInstanseCust } from "./axiosInstanseCust"
import { CustRequest, CustResponse } from "./cust.types"

export const custApi = {
  async login(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosInstanseCust.post<CustResponse>(
      "/customer/login", 
      cust
    )
    return data
  },

  async register(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosInstanseCust.post<CustResponse>(
      "/customer/register", 
      cust
    )
    return data
  }
}
