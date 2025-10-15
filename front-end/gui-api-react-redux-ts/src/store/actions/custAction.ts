import { BaseAction, AuthorKind, Token, CustomerId } from '../interfaces'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { openAlert } from "./alertAction"
import axios, { AxiosResponse } from "axios"
import { resetTrans } from "./transAction"
import store from '../../index'

export enum CustActionType {
    AUTHOR_CUSTOMER = 'AUTHOR_CUSTOMER',
    SET_TOKEN = 'SET_TOKEN'
}

export type CustAction =
  | BaseAction<CustActionType.AUTHOR_CUSTOMER, CustomerId>
  | BaseAction<CustActionType.SET_TOKEN, Token>

interface MyTokenPayload extends JwtPayload {
  customerId: number;
}

export const authorCustomer = (payload: CustomerId): CustAction  => ({
    type: CustActionType.AUTHOR_CUSTOMER,
    payload
})

export const setToken  = (payload: Token): CustAction => ({
    type: CustActionType.SET_TOKEN,
    payload
})

export const fetchCust = async (authorKind: AuthorKind,
                                name: string, 
                                pw: string
) => {
    const url = (authorKind === 'Login')
        ? 'http://127.0.0.1:8000/customer/login' 
        : 'http://127.0.0.1:8000/customer/register'; 

    const payload = { name: name, password: pw }

    try {
        const res: AxiosResponse<any> = await axios.post(url, payload)
        const token = res.data.token
        const tokenPayload = jwtDecode<MyTokenPayload>(token);
        store.dispatch(authorCustomer(tokenPayload.customerId))
        store.dispatch(setToken(token))
        store.dispatch(resetTrans())
    } catch (err: any) {
        if (err.response.status >= 500) { store.dispatch(openAlert(err.message)) }
        else { store.dispatch(openAlert(err.response.data.errMessage)) }
    }    
}
