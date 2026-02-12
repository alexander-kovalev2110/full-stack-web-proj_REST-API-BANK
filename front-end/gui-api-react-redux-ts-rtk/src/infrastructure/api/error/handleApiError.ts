// infrastructure/api/handleApiError.ts
import axios from "axios"

export function handleApiError(
  err: unknown,
  fallbackMessage: string
): string {
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.error ??
      fallbackMessage
    )
  }

  return fallbackMessage
}
