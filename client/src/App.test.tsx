import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import App from './App';
import { mockApolloClient } from './test-helpers';
import * as subscriptions from './graphql/subscriptions';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';

it('renders without crashing', () => {
  const client = mockApolloClient([
    {
      request: { query: subscriptions.messageAdded },
      result: { data: {} },
    },
  ]);
  const div = document.createElement('div');

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
