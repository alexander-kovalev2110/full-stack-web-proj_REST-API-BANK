// src/infrastructure/api/cost/axiosInstanseCust.ts
import axios from "axios"
import { API_URL } from "../../../config/env"

export const axiosInstanseCust = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
