import { BaseAction, AuthorKind, Customer, CustomerId } from '../interfaces'
import { openAlert } from "./alertAction"
import axios, { AxiosResponse } from "axios"
import { resetTrans } from "./transAction"
import store from '../../index'

export enum CustActionType {
    AUTHOR_CUSTOMER = 'AUTHOR_CUSTOMER'
}

export type CustAction = BaseAction<CustActionType, CustomerId>

export const authorCustomer = (payload: CustomerId): CustAction  => ({
    type: CustActionType.AUTHOR_CUSTOMER,
    payload
})

export const fetchCust = async (authorKind: AuthorKind,
                                name: string, 
                                pw: string
) => {
    const method = (authorKind === 'Login')? 'GET' : 'POST'      // Login / Signup
    const url = `http://127.0.0.1:8000/customer/${name}/${pw}`
    try {
        const res: AxiosResponse<Customer> = await axios({method: method, url: url})
        store.dispatch(authorCustomer(res.data.customerId))
        store.dispatch(resetTrans())
    } catch (err: any) {
        if (err.response.status > 400) { store.dispatch(openAlert(err.message)) }
        else { store.dispatch(openAlert(err.response.data.errMessage)) }
    }    
}
