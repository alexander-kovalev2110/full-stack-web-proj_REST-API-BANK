import * as actions from '../actions/modalWindAction'

export const initialState = {
    authorOpen: false,
    transOpen: false,
    authorKind: ''          // 'Login' / 'Signup'
}

export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case actions.OPEN_AUTHOR:
            return { ...state, authorOpen: true, authorKind: action.authorKind }

        case actions.CLOSE_AUTHOR:
            return { ...state, authorOpen: false }

        case actions.OPEN_TRANS:
            return { ...state, transOpen: true }

        case actions.CLOSE_TRANS:
            return { ...state, transOpen: false }

        default:
            return state
    }
}
