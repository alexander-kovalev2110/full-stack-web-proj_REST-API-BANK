// src/infrastructure/api/cust/cust.api.ts
import { axiosInstanseCust } from "./axiosInstanseCust"
import { CustRequest, CustResponse } from "./cust.types"

export const custApi = {
  async login(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosInstanseCust.post<CustResponse>(
      "/customers/login", 
      cust
    )
    return data
  },

  async register(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosInstanseCust.post<CustResponse>(
      "/customers/register", 
      cust
    )
    return data
  }
}
