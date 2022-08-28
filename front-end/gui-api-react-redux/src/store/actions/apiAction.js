import axios from "axios"
import Config from '../../services/config'
import store from "../../index"
import {resetOffset} from "./pageAction"

export const SET_CUSTOMER = 'SET_CUSTOMER'
export const SET_TRANS = 'SET_TRANS'
export const SET_MESSAGE = 'SET_MESSAGE'


export const setCustomer = (customerId) => ({
    type: SET_CUSTOMER,
    customerId: customerId
})

export const setTrans = (transactions) => ({
    type: SET_TRANS,
    transactions: transactions
})

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    message: message
})

export const fetchData = async (index) => {
    const config = Config(index, store.getState().apiRed.customerId)    // Setting config for axios

    store.dispatch(setTrans([]))
    store.dispatch(setMessage(''))
    store.dispatch(resetOffset())

    try {
        const res = await axios(config)
        const data = res.data
        if ('customerId' in res.data) { store.dispatch(setCustomer(data.customerId)) }
        if ('transactions' in res.data) { store.dispatch(setTrans(data.transactions)) }
        if ('message' in res.data) { store.dispatch(setMessage(data.message)) }
    } catch (err) {
        if (err.response.status > 400) {  store.dispatch(setMessage(err.message)) }
        else { store.dispatch(setMessage(err.response.data.message))}
    }
}
