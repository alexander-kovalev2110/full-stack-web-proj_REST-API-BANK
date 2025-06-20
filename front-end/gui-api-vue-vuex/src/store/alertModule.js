export const alertModule = {
    state: {
        alertOpen: false,
        errMessage: "",
    },

    mutations: {
        openAlert: (state, errMessage) => {
            state.alertOpen = true
            state.errMessage = errMessage

        },
        closeAlert: (state) => {
            state.alertOpen = false
            state.errMessage = ""
        }
    }
}   