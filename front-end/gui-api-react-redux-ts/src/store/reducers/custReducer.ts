import { CustomerId } from '../interfaces'
import { CustAction, CustActionType } from '../actions/custAction'

type CustState = {
    customerId: CustomerId
}

const initialState: CustState = {
    customerId: null
}

export const cust = (
            state: CustState = initialState, 
            action: CustAction
): CustState => {
    switch (action.type) {
        case CustActionType.AUTHOR_CUSTOMER:
            return { ...state, customerId: action.payload }

        default:
            return state
    }
}
