import { AUTHOR_CUSTOMER } from '../actions/custAction'

const initialState = {
    customerId: null
}

function custReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHOR_CUSTOMER:
            return { ...state, customerId: action.customerId }

        default:
            return state
    }
}

export default custReducer
