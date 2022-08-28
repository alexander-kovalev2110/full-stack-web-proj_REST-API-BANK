import * as actions from '../actions/apiAction'

export const initialState = {
    customerId: null,
    transactions: [],
    message: ''
}

export default function apiReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_CUSTOMER:
            return { ...state, customerId: action.customerId }

        case actions.SET_TRANS:
            return { ...state, transactions: action.transactions }

        case actions.SET_MESSAGE:
            return { ...state, message: action.message }

        default:
            return state
    }
}
