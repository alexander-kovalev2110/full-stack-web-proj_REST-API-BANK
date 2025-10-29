// src/store/actions/custAction.ts

import axios from 'axios'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { AppDispatch } from '../index'
import { openAlert } from './alertAction'
import { resetTrans } from './transAction'
import { BaseAction, AuthorKind, Token, CustomerId } from '../interfaces'

export enum CustActionType {
  SET_CUSTOMER = 'SET_CUSTOMER',
  SET_TOKEN = 'SET_TOKEN'
}

export type CustAction =
  | BaseAction<CustActionType.SET_CUSTOMER, CustomerId>
  | BaseAction<CustActionType.SET_TOKEN, Token>

export const setCustomer = (payload: CustomerId) => ({
  type: CustActionType.SET_CUSTOMER,
  payload
})

export const setToken = (payload: Token) => ({
  type: CustActionType.SET_TOKEN,
  payload
})

// type for thunk
interface MyTokenPayload extends JwtPayload {
  customerId: number
}

export type authorType = {
    kind: AuthorKind
    name: string
    pw: string
}

// Аsync thunk-action
export const fetchCust = (payload: authorType) => 
  async (dispatch: AppDispatch): Promise<void> => {
    const { kind, name, pw } = payload
    const domen = 'http://127.0.0.1:8000/customer'
    const url = kind === 'Login' ? `${domen}/login` : `${domen}/register`

    try {
      const res = await axios.post(url, { name, password: pw })

      const token: string = res.data?.token
      const decoded = jwtDecode<MyTokenPayload>(token)

      if (!token || !decoded.customerId) 
        throw new Error('Invalid token payload')

      dispatch(setCustomer(decoded.customerId))
      dispatch(setToken(token))
      dispatch(resetTrans())
    } catch (err: any) {
      dispatch(openAlert(err.response?.data?.error || err.message))
    }
  }
