const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

// Definition of GraphQL schema
const typeDefs = gql`
  type Customer {
    customerId: Int
  }

  type Transaction {
    transactionId: String
    amount: String
    date: String
  }

  type Query {
    getCustomer(name: String!, pw: String!): Customer
    getTransaction(transactionId: String!): [ Transaction ]
    getTransByFiltr(customerId: Int!, amount: String, date: String): [ Transaction ]
  }

  type Mutation {
    addCustomer(name: String!, pw: String!): Customer
    addTransaction(customerId: Int!, amount: String!): [Transaction]
    updTransaction(transactionId: String!, amount: String!): [Transaction]
    delTransaction(transactionId: String!): [Transaction]
  }
`

// Resolver
const resolvers = {
  Query: {
    getCustomer: async (_, { name, pw }) => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/customer/${name}/${pw}`)
        return res.data
      } catch (error) {
        throw new Error('Customer is not available.')
      }
    },

    getTransaction: async (_, { transactionId }) => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/transaction/${transactionId}`)
        return res.data.transactions
      } catch (error) {
        throw new Error('Transaction is not available.')
      }
    },

    getTransByFiltr: async (_, { customerId, amount, date }) => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/transaction/?customerId=${customerId}/&amount=${amount}&date=${date}`)
        return res.data.transactions
      } catch (error) {
        throw new Error('Transaction is not available.')
      }
    },    
  },

  Mutation: {
    addCustomer: async (_, { name, pw }) => {
      try {
        const res = await axios.post(`http://127.0.0.1:8000/customer/${name}/${pw}`)
        return res.data
      } catch (error) {
        throw new Error('Customer data is incorrect.')
      }
    },

    addTransaction: async (_, { customerId, amount }) => {
      try {
        const res = await axios.post(`http://127.0.0.1:8000/transaction/${customerId}/${amount}`)
        return res.data.transactions
      } catch (error) {
        throw new Error('Transaction data is incorrect.')
      }
    },
    
    updTransaction: async (_, { transactionId, amount }) => {
      try {
        const res = await axios.patch(`http://127.0.0.1:8000/transaction/${transactionId}/${amount}`)
        return res.data.transactions
      } catch (error) {
        throw new Error('Transaction is not available.')
      }
    },
    
    delTransaction: async (_, { transactionId }) => {
      try {
        const res = await axios.delete(`http://127.0.0.1:8000/transaction/${transactionId}`)
        return res.data.transactions
      } catch (error) {
        throw new Error('Transaction is not available.')
      }
    }, 
  },
}

// Apollo Server Creation
const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  formatError: (err) => {
    // Formatting and logging errors
    console.error(err)
    return err;
  }
})

// Starting the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
