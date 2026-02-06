// src/api/axiosInstanceTrans.ts
import axios from "axios"
import { API_URL } from "../config/env"

export const axiosInstanceTrans = axios.create({
  baseURL: API_URL,
})

// Request interceptor
axiosInstanceTrans.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
