import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from '@apollo/client';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#584e44',
    },
  },
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Shipping: {
      merge: true,
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
