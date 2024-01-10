import { AlertAction, AlertActionType } from '../actions/alertAction'

type AlertState = {
    alertOpen: boolean,
    errMessage: string | undefined
}

const initialState: AlertState = {
    alertOpen: false,
    errMessage: ''
}

export const alert = (
        state: AlertState = initialState, 
        action: AlertAction
): AlertState => {
    switch (action.type) {
        case AlertActionType.OPEN_ALERT:
            return { ...state, alertOpen: true, errMessage: action.payload }

        case AlertActionType.CLOSE_ALERT:
            return initialState

        default:
            return state
    }
}
