import { AxiosRequestConfig } from "axios"
import { Command } from "../interfaces"
import { TransQuery } from "../trans"

const TRANSACTION = "/transaction"
const TRANSACTIONS = "/transactions"

export const buildTransRequest = (
  payload: TransQuery
): AxiosRequestConfig => {
  const { command, transactionId, amount, date } = payload

  switch (command) {
    case Command.AddTrans:
      return {
        method: "POST",
        url: TRANSACTION,
        data: { amount },
      }

    case Command.GetTrans:
      return {
        method: "GET",
        url: `${TRANSACTION}/${transactionId}`,
      }

    case Command.GetTransByFilter:
      return {
        method: "GET",
        url: TRANSACTIONS,
        params: { amount, date },
      }

    case Command.UpdateTrans:
      return {
        method: "PATCH",
        url: `${TRANSACTION}/${transactionId}`,
        data: { amount },
      }

    case Command.delTrans:
      return {
        method: "DELETE",
        url: `${TRANSACTION}/${transactionId}`,
      }

    default:
      throw new Error("Unknown command")
  }
}
