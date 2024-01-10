import { command, Transaction } from '../interfaces'
import { TransAction, TransActionType } from '../actions/transAction'

const page = 5

type TransState = {
    command: command
    transactions: Transaction[],
    tabAr: Transaction[],
    offset: number,
    previousDisabled: boolean,
    nextDisabled: boolean
}

const initialState: TransState = {
    command: '',
    transactions: [],
    tabAr: [],
    offset: 0,
    previousDisabled: true,
    nextDisabled: true
}

export const  trans = (
    state: TransState = initialState, 
    action: TransAction
): TransState => {
    const { transactions, offset } = state
    const nextOffset = offset + page
    const previousOffset = offset - page

    switch (action.type) {
        case TransActionType.SET_COMMAND:
            return { ...state, command: action.payload as command}

        case TransActionType.SET_TRANS:
            return { ...state, transactions: action.payload as Transaction[] }

        case TransActionType.RESET_TRANS:
            return initialState    

        case TransActionType.SET_TABLE:
            return { ...state, offset: 0,
                                    tabAr: transactions.filter((el, index) =>
                                    ((index >= 0) && (index < page))),
                                nextDisabled: !(page < transactions.length),
                                previousDisabled: true 
                    }

        case TransActionType.NEXT_PAGE:
            return { ...state, offset: nextOffset,
                            tabAr: transactions.filter((el, index) =>
                                ((index >= nextOffset) && (index < nextOffset + page))),
                            nextDisabled: !((nextOffset + page) < transactions.length),
                            previousDisabled: !(nextOffset > 0) 
                    }

        case TransActionType.PREVIOUS_PAGE:
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
