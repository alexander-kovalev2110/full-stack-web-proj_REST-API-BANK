import { PAGE1 } from '../services/serv_data'
import store from '@/store'

export const pageModule = {
    state: {
        offset: 0,
        page: PAGE1
    },
    getters: {
        getOffset: state => {
            return state.offset
        },
        getPage: state => {
            return state.page
        }
    },
    mutations: {
        nextPage: (state) => {
            const { offset, page } = state
            const length = store.state.apiMod.transactions.length
            state.offset = ((offset + page) < length)? (offset + page): offset
        },
        previousPage: (state) => {
            const { offset, page } = state
            state.offset = ((offset - page) >= 0)? (offset - page): offset
        },
        setPage: (state, page) => {
            state.page = page
            state.offset = 0
        },
        resetOffset: (state) => {
            state.offset = 0
        }
    }
}
