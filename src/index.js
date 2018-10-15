import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'

import { ApolloProvider } from 'react-apollo'
// See https://github.com/apollographql/apollo-client/issues/3639
import { ApolloClient } from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'

// import link from './graphql/http-link'  // Real server connection
import mockLink from './graphql/schema-link' // Mock server for testing
import { defaults, resolvers } from './graphql/state-schema-link' // Mock server for testing

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
})

const stateLink = withClientState({
  cache,
  defaults,
  resolvers,
})

const link = ApolloLink.from([stateLink, mockLink])

const client = new ApolloClient({
  link,
  cache,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
