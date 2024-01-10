import store from "../store"
import axios from "axios"

export const transactionModule = {
    state: {
        command: '',
        transDialog: false,
        transactions: []
    },

    getters: {
        getTrans: state => {
            return state.transactions
        },
        // getTransDialog: state => {
        //     return state.transDialog
        // }
    },

    mutations: {
        setCommand: (state, command) => {
            state.command = command
        },
        setTrans: (state, transactions) => {
            state.transactions = transactions
        },
        openTransDialog: (state) => {
            state.transDialog = true
        },
        closeTransDialog: (state) => {
            state.transDialog = false
        }
    },

    actions: {
        async fetchTrans({commit}, payload) {
            const { transactionId, amount, date } = payload

            const command = store.state.transMod.command
            const customerId = store.state.customerMod.customerId
            const domen = 'http://127.0.0.1:8000/transaction'

            const conf = {}
            conf['Add Transaction'] = { method: 'POST', url: `${domen}/${customerId}/${amount}` }
            conf['Get Transaction'] = { method: 'GET', url: `${domen}/${transactionId}` }
            conf['Get Transaction by Filter'] = { method: 'GET', url: `${domen}/?customerId=${customerId}/&amount=${amount}&date=${date}` }
            conf['Update Transaction'] = { method: 'PATCH', url: `${domen}/${transactionId}/${amount}` }
            conf['Delete Transaction'] = { method: 'DELETE', url: `${domen}/${transactionId}` }
        
            try {
                const res = await axios(conf[command])
                console.log("res", res.data)           
                commit('setTrans', res.data.transactions)
                // commit('pageMod/setTable', res.data.transactions)
                // console.log("table", store.state.pageMod.tabAr) 
            } catch (err) {
                console.log()
                if (err.response.status > 400) { console.log(err.message) }
                else { console.log(err.response.data.message) }
            }
        }
    }
}