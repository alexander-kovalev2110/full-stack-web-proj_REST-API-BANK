import { AuthorKind } from '../interfaces'
import { ModalAction, ModalActionType } from '../actions/modalWindAction'

type ModalState = {
    authorOpen: boolean,
    transOpen: boolean,
    authorKind: AuthorKind          // 'Login' / 'Signup'
}

const initialState: ModalState = {
    authorOpen: false,
    transOpen: false,
    authorKind: ''
}

export const modalWind = (
        state: ModalState = initialState, 
        action: ModalAction
): ModalState => {
    switch (action.type) {
        case ModalActionType.OPEN_AUTHOR:
            return { ...state, authorOpen: true, authorKind: action.payload }

        case ModalActionType.CLOSE_AUTHOR:
            return { ...state, authorOpen: false }

        case ModalActionType.OPEN_TRANS:
            return { ...state, transOpen: true }

        case ModalActionType.CLOSE_TRANS:
            return { ...state, transOpen: false }

        default:
            return state
    }
}
