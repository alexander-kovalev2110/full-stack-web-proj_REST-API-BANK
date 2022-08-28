import * as actions from '../actions/indexAction'

export const initialState = {
    index: 0
}

export default function indexReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_INDEX:
            return {index: action.index}

        default:
            return state
    }
}
