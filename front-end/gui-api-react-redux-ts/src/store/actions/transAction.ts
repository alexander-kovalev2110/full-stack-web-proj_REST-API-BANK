import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { BaseAction, Command, Transaction, Transactions } from '../interfaces'
import { openAlert } from "./alertAction"
import { AppDispatch, RootState } from "../index"

export enum TransActionType {
    SET_COMMAND = 'SET_COMMAND',
    SET_TRANS = 'SET_TRANS',
    RESET_TRANS = 'RESET_TRANS',
    SET_TABLE = 'SET_TABLE',
    NEXT_PAGE = 'NEXT_PAGE',
    PREVIOUS_PAGE = 'PREVIOUS_PAGE'
}

type TransPayload = Command | Transaction[] | undefined

export type TransAction = BaseAction<TransActionType, TransPayload>

// Simple action creators
export const setCommand = (payload: Command): TransAction => ({
    type: TransActionType.SET_COMMAND,
    payload
})

export const setTrans = (payload: Transaction[]): TransAction => ({
    type: TransActionType.SET_TRANS,
    payload
})

export const resetTrans = (): TransAction => ({
    type: TransActionType.RESET_TRANS
})

export const setTable = (): TransAction => ({
    type: TransActionType.SET_TABLE
})

export const previousPage = (): TransAction => ({
    type: TransActionType.PREVIOUS_PAGE
})

export const nextPage = (): TransAction => ({
    type: TransActionType.NEXT_PAGE
})

export type Query = {
    transactionId?: number
    amount?: number
    date?: Date
}

type ConfigArrType = { [key in Command]: AxiosRequestConfig }

// Thunk-action
export const fetchTrans = (payload: Query) => 
    async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        const { transactionId, amount, date } = payload
        const state = getState()
        const command: Command = state.trans.command as Command
        const token = state.cust.token
        const domen = 'http://127.0.0.1:8000/transaction'

        const config: ConfigArrType = {
            [Command.AddTrans]: { method: 'POST', url: `${domen}`, data: { amount } },
            [Command.GetTrans]: { method: 'GET', url: `${domen}/${transactionId}` },
            [Command.GetTransByFilter]: { method: 'GET', url: `${domen}`, params: { amount, date } },
            [Command.UpdateTrans]: { method: 'PATCH', url: `${domen}`, data: { transactionId, amount } },
            [Command.delTrans]: { method: 'DELETE', url: `${domen}/${transactionId}` }
        }

        try {
            const res: AxiosResponse<Transactions> = await axios({
                ...config[command],
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!res.data?.transactions) {
                throw new Error("Invalid response from server")
            }

            dispatch(setTrans(res.data.transactions))
            dispatch(setTable())
        }
        catch (err: any) {
            const status = err?.response?.status
            const msg = status >= 500 ? err.message : err?.response?.data?.error
            dispatch(openAlert(msg))
        }
    }
