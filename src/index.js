import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import {
  ApolloProvider
} from 'react-apollo';

const token = localStorage.getItem('token')
const client = new ApolloClient({
  uri: "http://localhost:3003",
  headers: {
    authorization: `Bearer ${token}`
  }
})

ReactDOM.render(
  <ApolloProvider
    client={client}
  >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
