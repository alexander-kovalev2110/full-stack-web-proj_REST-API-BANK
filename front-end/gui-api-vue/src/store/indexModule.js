export const indexModule = {
    state: {
        index: 0
    },
    getters: {
        getIndex: state => {
            return state.index
        }
    },
    mutations: {
        setIndex: (state, index) => {
            state.index = index
        }
    }
}
