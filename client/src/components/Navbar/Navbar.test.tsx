import React from 'react';
import { createMemoryHistory } from 'history';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import Navbar from './index';
import { mockApolloClient } from '../../test-helpers';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { AppRoutes } from '../../AppRoutes';
import { isSignedIn } from '../../services/auth.service';

describe('Navbar', () => {
  afterEach(cleanup);

  it('goes to Root when clicking the logo', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
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

  it('goes to New Post Page when clicking the new post link', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
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

  it('goes to Sign In Page and logs out user when clicking the Sign out link', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Navbar history={history} />
          </ApolloProvider>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('sign-out-button'));

      await waitFor(() => {
        expect(history.location.pathname).toEqual('/sign-in');
        expect(isSignedIn()).toEqual(false);
      });
    }
  });

  it('goes to Profile when clicking the profile link', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Navbar history={history} />
          </ApolloProvider>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('profile-button'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual(AppRoutes.Profile)
      );
    }
  });
});
