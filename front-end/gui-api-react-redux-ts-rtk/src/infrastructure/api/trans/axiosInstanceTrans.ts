// src/infrastructure/api/trans/axiosInstanceTrans.ts
import axios from "axios"
import { API_URL } from "../../../config/env"
import { tokenStorage } from "../../storage/token.storage"

export const axiosInstanceTrans = axios.create({
  baseURL: API_URL,
})

// Request interceptor
axiosInstanceTrans.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
