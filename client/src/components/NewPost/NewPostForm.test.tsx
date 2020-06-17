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
import NewPostForm from './NewPostForm';
import { AddChatDocument } from '../../graphql/types';
import { mockApolloClient } from '../../test-helpers';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';

describe('NewPostForm', () => {
  afterEach(cleanup);

  it('enables add new post button when filled in', async () => {
    const history = createMemoryHistory();
    const client = mockApolloClient([]);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <NewPostForm history={history} />
          </ApolloProvider>
        </ThemeProvider>
      ).getByTestId;
    });

    const titleInput = await waitFor(() => getByTestId('title-input'));
    const descriptionInput = await waitFor(() =>
      getByTestId('description-input')
    );
    const contentInput = await waitFor(() => getByTestId('content-input'));

    const addPostButton = await waitFor(
      () => getByTestId('add-post-button') as HTMLButtonElement
    );

    expect(addPostButton.disabled).toEqual(true);

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'User Name' } });
      fireEvent.change(descriptionInput, { target: { value: 'description' } });
      fireEvent.change(contentInput, { target: { value: 'content' } });
    });

    await waitFor(() => expect(titleInput.value).toEqual('User Name'));
    await waitFor(() => expect(descriptionInput.value).toEqual('description'));
    await waitFor(() => expect(contentInput.value).toEqual('content'));
    await waitFor(() => expect(addPostButton.disabled).toEqual(false));
  });
});
