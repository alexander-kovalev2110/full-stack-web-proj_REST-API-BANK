import { gql } from '@apollo/client'

// GraphQL Queries
export const GET_CUSTOMER = gql`
query getCustomer($name: String!, $pw: String!) {
    getCustomer(name: $name, pw: $pw) {
        customerId
    }
}
`;

export const GET_TRANSACTION = gql`
query getTransaction($transactionId: String!) {
    getTransaction(transactionId: $transactionId) {
        transactionId
        amount
        date
    }
}
`;

export const GET_TRANS_BY_FILTR = gql`
query getTransByFiltr($customerId: Int!, $amount: String, $date: String) {
    getTransByFiltr(customerId: $customerId, amount: $amount, date: $date) {
        transactionId
        amount
        date
    }
}
`
