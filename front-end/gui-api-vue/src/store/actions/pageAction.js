import store from "../../index"

export const NEXT_PAGE = 'NEXT_PAGE'
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'
export const SET_PAGE = 'SET_PAGE'
export const RESET_OFFSET = 'RESET_OFFSET'

export const nextPage = () => ({
    type: NEXT_PAGE,
    length: store.getState().apiRed.transactions.length
})

export const previousPage = () => ({ type: PREVIOUS_PAGE })

export const setPage = page => ({
    type: SET_PAGE,
    page: page
})

export const resetOffset = () => ({ type: RESET_OFFSET })
