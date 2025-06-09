import { ApolloClient, InMemoryCache } from '@apollo/client'

// Setting of Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4000',   // GraphQL server
    cache: new InMemoryCache(),
    connectToDevTools: true,        // Enable DevTools for debugging
    
    defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache', // Игнорировать кеш при watchQuery
    },
    query: {
      fetchPolicy: 'no-cache', // Игнорировать кеш при query
    },
    mutate: {
      fetchPolicy: 'no-cache', // Игнорировать кеш при мутациях (редко нужно)
    },
  },});

  export default client
