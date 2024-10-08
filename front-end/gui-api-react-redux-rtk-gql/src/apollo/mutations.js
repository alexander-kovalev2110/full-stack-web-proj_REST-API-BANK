import { gql } from '@apollo/client'

// GraphQL Mutations
export const ADD_CUSTOMER = gql`
mutation addCustomer($name: String!, $pw: String!) {
    addCustomer(name: $name, pw: $pw) {
        customerId
    }
}
`

export const ADD_TRANSACTION = gql`
mutation addTransaction($customerId: Int!, $amount: String!) {
    addTransaction(customerId: $customerId, amount: $amount) {
        transactionId
        amount
        date
    }
}
`

export const UPD_TRANSACTION = gql`
mutation updTransaction($transactionId: String!, $amount: String!) {
    updTransaction(transactionId: $transactionId, amount: $amount) {
        transactionId
        amount
        date
    }
}
`

export const DEL_TRANSACTION = gql`
mutation delTransaction($transactionId: String!) {
    delTransaction(transactionId: $transactionId) {
        transactionId
        amount
        date
    }
}
`