import { ApolloClient, InMemoryCache } from '@apollo/client'

// Setting of Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4000',   // GraphQL server
    cache: new InMemoryCache(),
    connectToDevTools: true,        // Enable DevTools for debugging
  });

  export default client
