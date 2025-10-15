import store from "../../index"
import { BaseAction, Command, Transaction, Transactions } from '../interfaces'
import { openAlert } from "./alertAction"
import axios, { AxiosResponse, AxiosRequestConfig  } from "axios"

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

type ConfigArrType = {
    [key in Command]: AxiosRequestConfig
}

export const fetchTrans = async (payload: Query) => {
    const { transactionId, amount, date } = payload

    const command: Command = store.getState().trans.command as Command
    const token = store.getState().cust.token

    const domen = 'http://127.0.0.1:8000/transaction'

    const config: ConfigArrType = {
        [Command.AddTrans]: { 
            method: 'POST', 
            url: `${domen}`, 
            data: {
                amount: amount
            } 
        },
        [Command.GetTrans]: { 
            method: 'GET', 
            url: `${domen}/${transactionId}` 
        },
        [Command.GetTransByFilter]: { 
            method: 'GET', 
            url: `${domen}`, 
            params: {
                amount: amount,
                date: date
            } 
        },
        [Command.UpdateTrans]: { 
            method: 'PATCH', 
            url: `${domen}`, 
            data: {
                transactionId: transactionId, 
                amount: amount
            } 
        },
        [Command.delTrans]: { 
            method: 'DELETE', 
            url: `${domen}/${transactionId}` 
        }
    }

    try {
        const res: AxiosResponse<Transactions> = await axios({
            ...config[command], 
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        store.dispatch(setTrans(res.data.transactions))
        store.dispatch(setTable())      
    }
    catch (err: any) {
        // console.log('err', err)
        if (err.response.status >= 500) { store.dispatch(openAlert(err.message)) }
        else { store.dispatch(openAlert(err.response.data.errMessage)) }
    }
}
