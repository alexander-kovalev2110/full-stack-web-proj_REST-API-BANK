import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { ApolloProvider } from '@apollo/client'

import client from "./apollo/apolloClient"
import { store } from "./store/store"

import App from "./App"

const root = createRoot(document.getElementById("root"))
root.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)
