import axios from "axios"
import Config from '../services/config'

export const apiModule = {
    state: {
        customerId: null,
        transactions: [],
        message: ''
    },
    getters: {
        getCustomer: state => {
            return state.customerId
        },
        getTrans: state => {
            return state.transactions
        },
        getMessage: state => {
            return state.message
        },
    },
    mutations: {
        setCustomer: (state, customerId) => {
            state.customerId = customerId
        },
        setTrans: (state, transactions) => {
            state.transactions = transactions
        },
        setMessage: (state, message) => {
            state.message = message
        },
    },
    actions: {
        async fetchData({state, commit}, index) {
            const config = Config(index, state.customerId)      // Setting config for axios

            commit('setTrans', [])
            commit('setMessage', '')

            try {
                const res = await axios(config)
                const data = res.data
                if ('customerId' in data) { commit('setCustomer', data.customerId) }
                if ('transactions' in data) { commit('setTrans', data.transactions) }
                if ('message' in data) { commit('setMessage', data.message) }
            } catch (err) {
                if (err.response.status > 400) { commit('setMessage', err.message) }
                else { commit('setMessage', err.response.data.message) }
            }
        }
    }
}
