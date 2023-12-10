import store from "../../index"
import { openAlert } from "./alertAction"
import axios from "axios"
import { resetTrans } from "./transAction"

export const AUTHOR_CUSTOMER = 'LOGIN_CUSTOMER'

export const authorCustomer = (customerId) => ({
    type: AUTHOR_CUSTOMER,
    customerId: customerId
})

export const fetchCust = async (authorKind, name, pw) => {
    const method = (authorKind === 'Login')? 'GET' : 'POST'      // Login / Signup
    const url = `http://127.0.0.1:8000/customer/${name}/${pw}`

    try {
        const res = await axios({method: method, url: url})
        store.dispatch(authorCustomer(res.data.customerId))
        store.dispatch(resetTrans())
    } catch (err) {
        if (err.response.status > 400) { store.dispatch(openAlert(err.message)) }
        else { store.dispatch(openAlert(err.response.data.errMessage)) }
    }
}