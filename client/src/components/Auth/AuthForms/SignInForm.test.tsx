import { createMemoryHistory } from 'history';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  act,
  cleanup,
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import SignInForm from './SignInForm';
import { SignInDocument } from '../../../graphql/types';
import { mockApolloClient } from '../../../test-helpers';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles';

describe('SignInForm', () => {
  afterEach(cleanup);

  it('enables sign-in button when filled in', async () => {
    const history = createMemoryHistory();
    const client = mockApolloClient([]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <SignInForm history={history} />
          </ApolloProvider>
        </ThemeProvider>
      ).getByTestId;
    });

    const signInButton = await waitFor(
      () => getByTestId('sign-in-button') as HTMLButtonElement
    );
    const emailInput = await waitFor(() => getByTestId('email-input'));
    const passwordInput = await waitFor(() => getByTestId('password-input'));

    expect(signInButton.disabled).toEqual(true);

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'email' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    await waitFor(() => expect(signInButton.disabled).toEqual(false));
  });

  it('prints server error if input was wrong', async () => {
    const history = createMemoryHistory();

    const client = mockApolloClient([
      {
        request: {
          query: SignInDocument,
          variables: {
            email: 'email',
            password: 'password',
          },
        },
        get result() {
          throw Error('sign-in failed');
        },
      },
    ]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <SignInForm history={history} />
          </ApolloProvider>
        </ThemeProvider>
      ).getByTestId;
    });

    const signInButton = await waitFor(
      () => getByTestId('sign-in-button') as HTMLButtonElement
    );
    const emailInput = await waitFor(() => getByTestId('email-input'));
    const passwordInput = await waitFor(() => getByTestId('password-input'));

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'email' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    await waitFor(() => expect(emailInput.value).toEqual('email'));

    await waitFor(() => expect(passwordInput.value).toEqual('password'));

    act(() => {
      fireEvent.click(signInButton);
    });

    const errorMessage = await waitFor(() => getByTestId('message'));

    await waitFor(() =>
      expect(errorMessage.innerHTML).toContain('sign-in failed')
    );
  });

  it('navigates to /home if everything went right', async () => {
    const history = createMemoryHistory();

    const client = mockApolloClient([
      {
        request: {
          query: SignInDocument,
          variables: {
            email: 'email',
            password: 'password',
          },
        },
        result: { data: {} },
      },
    ]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <SignInForm history={history} />
          </ApolloProvider>
        </ThemeProvider>
      ).getByTestId;
    });

    const emailInput = await waitFor(() => getByTestId('email-input'));
    const passwordInput = await waitFor(() => getByTestId('password-input'));
    const signInButton = await waitFor(
      () => getByTestId('sign-in-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'email' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    await waitFor(() => expect(emailInput.value).toEqual('email'));

    await waitFor(() => expect(passwordInput.value).toEqual('password'));

    act(() => {
      fireEvent.click(signInButton);
    });

    await waitFor(() => expect(history.location.pathname).toEqual('/home'), {
      timeout: 3000,
    });
  });
});
