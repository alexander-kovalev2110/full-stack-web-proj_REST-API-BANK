import axios from "axios"

export function parseAxiosError(
  err: unknown,
  fallback = "Unexpected error"
): string {
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.error ??
      err.message ??
      fallback
    )
  }
  return fallback
}
