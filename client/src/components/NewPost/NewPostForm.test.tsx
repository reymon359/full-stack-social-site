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
import { AddPostDocument } from '../../graphql/types';
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
      fireEvent.change(titleInput, { target: { value: 'title' } });
      fireEvent.change(descriptionInput, { target: { value: 'description' } });
      fireEvent.change(contentInput, { target: { value: 'content' } });
    });

    await waitFor(() => expect(titleInput.value).toEqual('title'));
    await waitFor(() => expect(descriptionInput.value).toEqual('description'));
    await waitFor(() => expect(contentInput.value).toEqual('content'));
    await waitFor(() => expect(addPostButton.disabled).toEqual(false));
  });

  it('prints server error if input was wrong', async () => {
    const history = createMemoryHistory();

    const client = mockApolloClient([
      {
        request: {
          query: AddPostDocument,
          variables: {
            title: 'title',
            picture: 'picture',
            description: 'description',
            content: 'content',
          },
        },
        get result() {
          throw Error('add-post failed');
        },
      },
    ]);

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
    const pictureInput = await waitFor(() => getByTestId('picture-input'));
    const contentInput = await waitFor(() => getByTestId('content-input'));

    const addPostButton = await waitFor(
      () => getByTestId('add-post-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'title' } });
      fireEvent.change(descriptionInput, { target: { value: 'description' } });
      fireEvent.change(pictureInput, { target: { value: 'picture' } });
      fireEvent.change(contentInput, { target: { value: 'content' } });
    });

    await waitFor(() => expect(titleInput.value).toEqual('title'));
    await waitFor(() => expect(descriptionInput.value).toEqual('description'));
    await waitFor(() => expect(pictureInput.value).toEqual('picture'));
    await waitFor(() => expect(contentInput.value).toEqual('content'));

    act(() => {
      fireEvent.click(addPostButton);
    });

    const errorMessage = await waitFor(() => getByTestId('message'));

    await waitFor(() =>
      expect(errorMessage.innerHTML).toContain('add-post failed')
    );
  });

  it('navigates to /post if everything went right', async () => {
    const history = createMemoryHistory();
    const mockedIdResponse = '9';
    const client = mockApolloClient([
      {
        request: {
          query: AddPostDocument,
          variables: {
            title: 'title',
            picture: 'picture',
            description: 'description',
            content: 'content',
          },
        },
        result: {
          data: {
            addPost: {
              id: mockedIdResponse,
            },
          },
        },
      },
    ]);

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
    const pictureInput = await waitFor(() => getByTestId('picture-input'));
    const contentInput = await waitFor(() => getByTestId('content-input'));

    const addPostButton = await waitFor(
      () => getByTestId('add-post-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'title' } });
      fireEvent.change(descriptionInput, { target: { value: 'description' } });
      fireEvent.change(pictureInput, { target: { value: 'picture' } });
      fireEvent.change(contentInput, { target: { value: 'content' } });
    });

    await waitFor(() => expect(titleInput.value).toEqual('title'));
    await waitFor(() => expect(descriptionInput.value).toEqual('description'));
    await waitFor(() => expect(pictureInput.value).toEqual('picture'));
    await waitFor(() => expect(contentInput.value).toEqual('content'));

    act(() => {
      fireEvent.click(addPostButton);
    });

    await waitFor(
      () =>
        expect(history.location.pathname).toEqual(`/post/${mockedIdResponse}`),
      {
        timeout: 3000,
      }
    );
  });
});
