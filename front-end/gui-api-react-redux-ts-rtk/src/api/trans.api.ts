import { axiosInstance } from "./axiosInstance"
import { Transactions } from "../store/trans/trans.types"

export const transApi = {
  /**
  * Create transaction
  * POST /transaction
  */
  async create(amount: number): Promise<Transactions> {
    const { data } = await axiosInstance.post<Transactions>("/transaction", { amount })
    return data
  },

  /**
  * Get transaction by id
  * GET /transaction/:id
  */
  async getById(id: string): Promise<Transactions> {
    const { data } = await axiosInstance.get<Transactions>(`/transaction/${id}`)
    return data
  },

  /**
  * Get transactions by filter
  * GET /transactions?amount=&date=
  */
  async getByFilter(params: { amount?: number, date?: string }): Promise<Transactions> {
    const { data } = await axiosInstance.get<Transactions>("/transactions", { params })
    return data
  },

  /**
  * Update transaction
  * PATCH /transaction/:id
  */
  async update(id: string, amount: number): Promise<Transactions> {
    const { data } = await axiosInstance.patch<Transactions>(`/transaction/${id}`, { amount })
    return data
  },

  /**
  * Delete transaction
  * DELETE /transaction/:id
  */
  async remove(id: string): Promise<Transactions> {
    const { data } = await axiosInstance.delete<Transactions>(`/transaction/${id}`)
    return data
  },
}
