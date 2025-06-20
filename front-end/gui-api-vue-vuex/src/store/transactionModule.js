import store from "../store"
import axios from "axios"

const page = 5

const initialState = () => ({
  command: '',
  transOpen: false,
  transactions: [],
  tabAr: [],
  offset: 0,
  previousDisabled: true,
  nextDisabled: true
})

export const transactionModule = {
 state: initialState(),

    mutations: {
        openTrans: (state) => {
            state.transOpen = true
        },
        closeTrans: (state) => {
            state.transOpen = false
        },
        setCommand: (state, command) => {
            state.command = command
        },
        setTrans: (state, transactions) => {
            state.transactions = transactions
            state.tabAr = transactions.filter((el, index) =>
                                    ((index >= 0) && (index < page)))
            state.nextDisabled = !(page < transactions.length)
            state.previousDisabled = true
        },
        resetTrans: (state) => {
            const newState = initialState()
            Object.keys(newState).forEach(key => {
                state[key] = newState[key]
            })    
        },
        previousPage: (state) => {
            const previousOffset = state.offset - page
            state.offset = previousOffset
            state.tabAr = state.transactions.filter((el, index) =>
                        ((index >= previousOffset) && (index < previousOffset + page)))
            state.nextDisabled = !((previousOffset + page) < state.transactions.length),
            state.previousDisabled = !(previousOffset > 0)
        },
        nextPage: (state) => {
            const nextOffset = state.offset + page
            state.offset = nextOffset
            state.tabAr = state.transactions.filter((el, index) =>
                        ((index >= nextOffset) && (index < nextOffset + page)))
            state.nextDisabled = !((nextOffset + page) < state.transactions.length),
            state.previousDisabled = !(nextOffset > 0)
        },
    },

    actions: {
        async fetchTrans({commit}, payload) {
            const { transactionId, amount, date } = payload

            const command = store.state.transMod.command
            const customerId = store.state.customerMod.customerId
            const domen = 'http://127.0.0.1:8000/transaction'

            const conf = {}
            conf['Add Transaction'] = { method: 'POST', url: `${domen}/${customerId}/${amount}` }
            conf['Get Transaction'] = { method: 'GET', url: `${domen}/${customerId}/${transactionId}` }
            conf['Get Transaction by Filter'] = { method: 'GET', url: `${domen}/${customerId}/?amount=${amount}&date=${date}` }
            conf['Update Transaction'] = { method: 'PATCH', url: `${domen}/${customerId}/${transactionId}/${amount}` }
            conf['Delete Transaction'] = { method: 'DELETE', url: `${domen}/${customerId}/${transactionId}` }
        
            try {
                const res = await axios(conf[command])        
                commit('setTrans', res.data.transactions)
            } catch (err) {
                if (err.response.status > 400) { commit('openAlert', err.message) }
                else { commit('openAlert', err.response.data.errMessage) }
            }
        }
    }
}