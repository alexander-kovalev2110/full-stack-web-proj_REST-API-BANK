import * as actions from '../actions/pageAction'
import { PAGE1 } from '../../services/serv_data'

export const initialState = {
    offset: 0,
    page: PAGE1
}

export default function pageReducer(state = initialState, action) {
    switch (action.type) {
        case actions.NEXT_PAGE:
            return {...state, offset: ((state.offset + state.page) < action.length)? (state.offset + state.page): state.offset}

        case actions.PREVIOUS_PAGE:
            return {...state, offset: ((state.offset - state.page) >= 0)? (state.offset - state.page): state.offset}

        case actions.SET_PAGE:
            return {...state, page: action.page, offset: 0}

        case actions.RESET_OFFSET:
            return {...state, offset: 0}

        default:
            return state
    }
}
