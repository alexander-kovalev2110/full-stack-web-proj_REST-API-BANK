// src/api/authApi.ts
import { axiosInstance } from "./axiosInstance"

export type AuthResponse = {
  token: string
}

const CUSTOMER = "/customer"

export const authApi = {
  login(name: string, password: string) {
    return axiosInstance.post<AuthResponse>(`${CUSTOMER}/login`, {
      name,
      password,
    })
  },

  register(name: string, password: string) {
    return axiosInstance.post<AuthResponse>(`${CUSTOMER}/register`, {
      name,
      password,
    })
  },
}

// const API_URL = import.meta.env.VITE_API_URL

