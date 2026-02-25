// src/infrastructure/api/trans.api.ts
import { axiosInstanceTrans } from "./axiosInstanceTrans"
import { TransactionsResponse } from "./trans.types"

export const transApi = {
  // Create transaction
  async create(amount: number): Promise<TransactionsResponse> {
    const { data } = await axiosInstanceTrans.post<TransactionsResponse>(
      "/transactions", 
      { amount }
    )
    return data
  },

  // Get transaction by id
  async getById(id: string): Promise<TransactionsResponse> {
    const { data } = await axiosInstanceTrans.get<TransactionsResponse>(
      `/transactions/${id}`
    )
    return data
  },

  // Get transactions by filter
  async getByFilter(params: { 
    amount?: number
    date?: string
    page?: number
    limit?: number
  }): Promise<TransactionsResponse> {
    const { data } = await axiosInstanceTrans.get<TransactionsResponse>(
      "/transactions", 
      { params }
    )
    return data
  },

  // Update transaction
  async update(id: string, amount: number): Promise<TransactionsResponse> {
    const { data } = await axiosInstanceTrans.patch<TransactionsResponse>(
      `/transactions/${id}`, 
      { amount }
    )
    return data
  },


  // Delete transaction
  async remove(id: string): Promise<TransactionsResponse> {
    const { data } = await axiosInstanceTrans.delete<TransactionsResponse>(
      `/transactions/${id}`
    )
    return data
  },
}
