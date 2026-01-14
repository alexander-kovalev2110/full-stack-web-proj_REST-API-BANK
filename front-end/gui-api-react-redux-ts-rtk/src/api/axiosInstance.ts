// src/api/axiosInstance.ts
import axios from "axios"

// const API_URL = import.meta.env.VITE_API_URL
const API_URL = "http://127.0.0.1:8000"

export const axiosInstance = axios.create({
  baseURL: API_URL,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
