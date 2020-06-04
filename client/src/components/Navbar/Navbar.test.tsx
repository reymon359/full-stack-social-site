import React from 'react';
import { createMemoryHistory } from 'history';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import Navbar from './index';
import { mockApolloClient } from '../../test-helpers';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { AppRoutes } from '../../AppRoutes';

describe('Navbar', () => {
  afterEach(cleanup);

  it('goes to root when clicking the logo', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Navbar history={history} />
          </ApolloProvider>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('root-logo'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual(AppRoutes.Root)
      );
    }
  });

  it('goes to new post when clicking the new post link', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { container, getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Navbar history={history} />
          </ApolloProvider>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('new-post-button'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual(AppRoutes.NewPost)
      );
    }
  });
});
