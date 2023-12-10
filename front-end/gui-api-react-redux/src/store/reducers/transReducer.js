import { SET_COMMAND, SET_TRANS, RESET_TRANS } from "../actions/transAction"
import { SET_TABLE, NEXT_PAGE, PREVIOUS_PAGE } from "../actions/transAction"

const page = 5

const initialState = {
    command: '',
    transactions: [],
    tabAr: [],
    offset: 0,
    previousDisabled: true,
    nextDisabled: true
}

function transReducer(state = initialState, action) {
    const { transactions, offset } = state
    const nextOffset = offset + page
    const previousOffset = offset - page

    switch (action.type) {
        case SET_COMMAND:
            return { ...state, command: action.command }

        case SET_TRANS:
            return { ...state, transactions: action.transactions }

        case RESET_TRANS:
            return initialState    

        case SET_TABLE:
            return { ...state, offset: 0,
                                tabAr: transactions.filter((el, index) =>
                                    ((index >= 0) && (index < page))),
                                nextDisabled: !(page < transactions.length) 
                    }

        case NEXT_PAGE:
            return { ...state, offset: nextOffset,
                            tabAr: transactions.filter((el, index) =>
                                ((index >= nextOffset) && (index < nextOffset + page))),
                            nextDisabled: !((nextOffset + page) < transactions.length),
                            previousDisabled: !(nextOffset > 0) 
                    }

        case PREVIOUS_PAGE:
            return { ...state, offset: previousOffset,
                            tabAr: transactions.filter((el, index) =>
                                ((index >= previousOffset) && (index < previousOffset + page))),
                            nextDisabled: !((previousOffset + page) < transactions.length),    
                            previousDisabled: !(previousOffset > 0)
                    }

        default:
            return state
    }
}

export default transReducer
