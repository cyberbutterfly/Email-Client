import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo'
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    div
  )  
  ReactDOM.unmountComponentAtNode(div);
});
