// src/infrastructure/storage/token.storage.ts
const TOKEN_KEY = "token"

export const tokenStorage = {
  save(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  get(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY)
  },
}
