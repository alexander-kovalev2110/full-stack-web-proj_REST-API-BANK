// src/api/trans.request.builder.ts
import { AxiosRequestConfig } from "axios"
import { Command } from "../shared/interfaces"
import { TransQuery } from "../store/trans/trans.types"

const BASE = "/transaction"
const LIST = "/transactions"

export const buildTransRequest = (
  payload: TransQuery
): AxiosRequestConfig => {
  const { command, transactionId, amount, date } = payload

  switch (command) {
    case Command.AddTrans:
      return {
        method: "POST",
        url: BASE,
        data: { amount },
      }

    case Command.GetTrans:
      return {
        method: "GET",
        url: `${BASE}/${transactionId}`,
      }

    case Command.GetTransByFilter:
      return {
        method: "GET",
        url: LIST,
        params: { amount, date },
      }

    case Command.UpdateTrans:
      return {
        method: "PATCH",
        url: `${BASE}/${transactionId}`,
        data: { amount },
      }

    case Command.DelTrans:
      return {
        method: "DELETE",
        url: `${BASE}/${transactionId}`,
      }

    default:
      throw new Error("Unknown command")
  }
}
