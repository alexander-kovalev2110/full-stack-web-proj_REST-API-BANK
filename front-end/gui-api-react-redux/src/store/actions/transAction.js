import store from "../../index"
import { openAlert } from "./alertAction"
import axios from "axios"

export const SET_COMMAND = 'SET_COMMAND'
export const SET_TRANS = 'SET_TRANS'
export const RESET_TRANS = 'RESET_TRANS'
export const SET_TABLE = 'SET_TABLE'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'

export const setCommand = (command) => ({
    type: SET_COMMAND,
    command: command
})

export const setTrans = (transactions) => ({
    type: SET_TRANS,
    transactions: transactions
})

export const resetTrans = () => ({
    type: RESET_TRANS
})

export const setTable = () => ({
    type: SET_TABLE
})

export const previousPage = () => ({
    type: PREVIOUS_PAGE
})

export const nextPage = () => ({
    type: NEXT_PAGE
})

export const fetchTrans = async (payload) => {
    const { transactionId, amount, date } = payload

    const command = store.getState().transRed.command
    const customerId = store.getState().custRed.customerId

    // Data for interacting with Transaction DB (method, url)
    const domen = 'http://127.0.0.1:8000/transaction'
    const config = {
        ['Add Transaction'] : { method: 'POST', url: `${domen}/${customerId}/${amount}` },
        ['Get Transaction'] : { method: 'GET', url: `${domen}/${transactionId}` },
        ['Get Transaction by Filter'] : { method: 'GET', url: `${domen}/?customerId=${customerId}/&amount=${amount}&date=${date}` },
        ['Update Transaction'] : { method: 'PATCH', url: `${domen}/${transactionId}/${amount}` },
        ['Delete Transaction'] : { method: 'DELETE', url: `${domen}/${transactionId}` } 
    }
    
    try {
        const res = await axios(config[command])
        store.dispatch(setTrans(res.data.transactions))
        store.dispatch(setTable())
    }
    catch (err) {
        if (err.response.status > 400) { store.dispatch(openAlert(err.message)) }
        else { store.dispatch(openAlert(err.response.data.errMessage)) }
    }
}
