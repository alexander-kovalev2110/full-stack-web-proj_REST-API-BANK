// import store from '@/store'

export const pageModule = {
    state: {
        tabAr: [],
        offset: 0,
        page: 5,
        previousDisabled: true,
        nextDisabled: true
    },
    // getters: {
    //     getOffset: state => {
    //         return state.offset
    //     },
    //     getPage: state => {
    //         return state.page
    //     }
    // },
    mutations: {
        nextPage: (state) => {
            // const { offset, page } = state
            // const length = store.state.apiMod.transactions.length
            // state.offset = ((offset + page) < length)? (offset + page): offset
            state.offset = state.offset + state.page
        },
        previousPage: (state) => {
            // const { offset, page } = state
            // state.offset = ((offset - page) >= 0)? (offset - page): offset
            state.offset = state.offset - state.page
        },
        setPage: (state, page) => {
            state.page = page
            state.offset = 0
        },
        resetOffset: (state) => {
            state.offset = 0
        },
        setTable: (state, transactions) => {
            const { offset, page } = state

            state.tabAr = transactions.filter((el, index) =>
                        ((index >= offset) && (index < (offset + page))))

            state.nextDisabled = !((offset + page) < state.transMod.transactions.length)
            
            state.previousDisabled = !((offset - page) >= 0)
        }
    }
}
