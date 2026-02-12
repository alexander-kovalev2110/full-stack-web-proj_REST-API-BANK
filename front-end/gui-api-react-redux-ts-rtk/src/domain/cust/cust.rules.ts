// domain/cust/cust.rules.ts
import type { Customer } from "./cust.types"

export function validateRegister(customer: Customer): string | null {
  if (customer.name.length < 3) {
    return "Username must be at least 3 characters"
  }

  if (customer.password.length < 3) {
    return "Password must be at least 3 characters"
  }

  return null
}
