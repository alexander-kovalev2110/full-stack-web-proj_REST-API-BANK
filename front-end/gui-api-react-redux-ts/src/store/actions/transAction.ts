import store from "../../index"
import { BaseAction, Command, Transaction, Transactions } from '../interfaces'
import { openAlert } from "./alertAction"
import axios, { AxiosResponse } from "axios"

export enum TransActionType {
    SET_COMMAND = 'SET_COMMAND',
    SET_TRANS = 'SET_TRANS',
    RESET_TRANS = 'RESET_TRANS',
    SET_TABLE = 'SET_TABLE',
    NEXT_PAGE = 'NEXT_PAGE',
    PREVIOUS_PAGE = 'PREVIOUS_PAGE'
}

type TransPayload = Command | Transaction[]| undefined

export type TransAction = BaseAction<TransActionType, TransPayload>

export const setCommand = (payload:  Command): TransAction => ({
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
    transactionId: number,
    amount: number,
    date: Date
}

type Config = {
    method: string,
    url: string
}

type ConfigArrType = {
    [key in Command]: Config
}

export const fetchTrans = async (payload: Query) => {
    const { transactionId, amount, date } = payload

    const command: Command = store.getState().trans.command as Command
    const customerId = store.getState().cust.customerId

    const domen = 'http://127.0.0.1:8000/transaction'

    // Data for interacting with Transaction DB (method, url)
    const config: ConfigArrType = {
        [Command.AddTrans]: { method: 'POST', url: `${domen}/${customerId}/${amount}` },
        [Command.GetTrans]: { method: 'GET', url: `${domen}/${customerId}/${transactionId}` },
        [Command.GetTransByFilter]: { method: 'GET', url: `${domen}/${customerId}/?amount=${amount}&date=${date}` },
        [Command.UpdateTrans]: { method: 'PATCH', url: `${domen}/${customerId}/${transactionId}/${amount}` },
        [Command.delTrans]:  { method: 'DELETE', url: `${domen}/${customerId}/${transactionId}` }
    }

    try {
        const res: AxiosResponse<Transactions> = await axios(config[command])
        store.dispatch(setTrans(res.data.transactions))
        store.dispatch(setTable())      
    }
    catch (err: any) {
        if (err.response.status > 400) { store.dispatch(openAlert(err.message)) }
        else { store.dispatch(openAlert(err.response.data.errMessage)) }
    }
}
