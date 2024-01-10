import axios from "axios"
import router from "../router"

export const customerModule = {
    state: {
        customerId: null
    },

    getters: {
        getCustomer: state => {
            return state.customerId
        },
        // getDialog: state => {
        //     return state.customerDialog
        // },
    },

    mutations: {
        setCustomer: (state, customerId) => {
            state.customerId = customerId
            if ( state.customerId !== null ) {
                router.push({name: 'trans'})           // Go to page <TransPage>  
              }
        },
        // setDialog: (state, dialog) => {
        //     state.customerDialog = dialog
        // },
    },

    actions: {
        async fetchCustomer({commit}, method) {
            const name = document.getElementById('name').value
            const pw = document.getElementById('pw').value
            const url = `http://127.0.0.1:8000/customer/${name}/${pw}`

            try {
                const res = await axios({method: method, url: url})
                console.log("res", res)
                const data = res.data               
                commit('setCustomer', data.customerId)
             } catch (err) {
                console.log("err", err)
                if (err.response.status > 400) { console.log(err.message) }
                else { console.log(err.response.data.message) }
            }
        }
    }
}
