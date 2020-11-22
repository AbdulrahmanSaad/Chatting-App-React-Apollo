import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloProvider
} from 'react-apollo';
import { 
  ApolloClient, 
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000`,
  options: {
    reconnect: true
  }
});


const httpLink = new HttpLink({
  uri: 'http://localhost:3000',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider
    client={client}
  >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
