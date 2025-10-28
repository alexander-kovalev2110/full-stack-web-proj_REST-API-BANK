import { CustomerId, Token } from '../interfaces'
import { CustAction, CustActionType } from '../actions/custAction'

type CustState = {
    customerId: CustomerId,
    token: Token
}

const initialState: CustState = {
    customerId: null,
    token: null
}

export const cust = (
            state: CustState = initialState, 
            action: CustAction
): CustState => {
    switch (action.type) {
        case CustActionType.SET_CUSTOMER:
            return { ...state, customerId: action.payload }

        case CustActionType.SET_TOKEN:
            return { ...state, token: action.payload }

        default:
            return state
    }
}
