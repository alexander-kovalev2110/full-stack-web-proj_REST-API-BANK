import axios from "axios"
import router from '@/router'

export const customerModule = {
    state: {
        customerId: null,
        authorOpen: false,
        method: 'GET'
    },

    mutations: {
        setCustomer: (state, customerId) => {
            state.customerId = customerId
        },
        openAuthor: (state, method) => {
            state.authorOpen = true
            state.method = method
        },
        closeAuthor: (state) => {
            state.authorOpen = false
        }
    },

    actions: {
        async fetchCustomer({state, commit}) {
            const name = document.getElementById('name').value
            const pw = document.getElementById('pw').value
            const url = `http://127.0.0.1:8000/customer/${name}/${pw}`

            try {
                const res = await axios({method: state.method, url: url})
                const data = res.data         
                commit('setCustomer', data.customerId)
                commit('resetTrans')
                router.push({name: 'trans'})           // Go to page <TransPage>    
             } catch (err) {
                if (err.response.status > 400) { commit('openAlert', err.message) }
                else { commit('openAlert', err.response.data.errMessage) }
            }
        }
    }
}
