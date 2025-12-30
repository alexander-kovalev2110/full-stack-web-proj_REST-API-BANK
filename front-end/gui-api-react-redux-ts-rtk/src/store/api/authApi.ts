import axios from "axios"

// const API_URL = import.meta.env.VITE_API_URL
const API_URL = "http://127.0.0.1:8000/customer"

export type AuthResponse = {
  token: string
}

export const authApi = {
  login(name: string, password: string) {
    return axios.post<AuthResponse>(`${API_URL}/login`, {
      name,
      password,
    })
  },

  register(name: string, password: string) {
    return axios.post<AuthResponse>(`${API_URL}/register`, {
      name,
      password,
    })
  },
}
