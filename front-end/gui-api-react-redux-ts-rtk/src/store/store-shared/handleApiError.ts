// src/store/sstore-shared/handleApiError.ts
import axios from "axios"

export type ApiError = string | Record<string, string>

export function handleApiError(
  err: unknown,
  fallbackMessage: string
): ApiError {
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.error ||
      err.response?.data?.errors ||
      fallbackMessage
    )
  }

  return "Unknown error"
}
