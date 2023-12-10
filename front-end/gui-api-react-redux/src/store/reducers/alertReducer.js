import * as actions from '../actions/alertAction'

export const initialState = {
    alertOpen: false,
    errMessage: ''
}

export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case actions.OPEN_ALERT:
            return { ...state, alertOpen: true, errMessage: action.errMessage }

        case actions.CLOSE_ALERT:
            return { ...state, alertOpen: false, errMessage: '' }

        default:
            return state
    }
}