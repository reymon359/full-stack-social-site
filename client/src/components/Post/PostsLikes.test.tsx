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
import {
  AddPostDocument,
  GetUserLikedPostsDocument,
  GetUserLikedPostsIdsDocument,
  LikePostDocument,
  UnlikePostDocument,
} from '../../graphql/types';
import { mockApolloClient } from '../../test-helpers';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import PostLikes from './PostLikes';
import { mockAuth } from '../../../../server/tests/mocks/auth.provider';
import { server } from '../../../../server/server';

describe('PostLikes', () => {
  afterEach(cleanup);
  const mockPost = {
    id: '4',
    title: 'Alicante is the best',
    picture: 'https://source.unsplash.com/1600x900/?alicante',
    description:
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maece',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maecenas sed enim ut sem. In tellus integer feugiat scelerisque. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat orci nique. Magna sit amet purus gravida quis blandit. Aliquam sem fringilla ut morbi tincidunt augue. Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor. Risus ultricies tristique nulla aliquet enim. Ornare aenean euismod elementum nisi quis. Auctor urna nunc id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
    createdAt: '2020-06-11T12:40:00.000Z',
    likes: 2,
    user: {
      id: '3',
      name: 'Bryan Wallace',
      username: 'bryan',
      picture: 'https://robohash.org/bryan?set=set5',
      email: 'bryan@bryan.com',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      followers: 1,
      following: 2,
    },
  };
  it('likes and unlikes a post properly', async () => {
    const mockUserId = 1;
    mockAuth(mockUserId);
    const client = mockApolloClient([
      {
        request: {
          query: GetUserLikedPostsIdsDocument,
          variables: {
            userId: mockUserId,
          },
        },
        result: {
          data: {
            userLikedPosts: [
              { id: '5', __typename: 'Post' },
              { id: '3', __typename: 'Post' },
            ],
          },
        },
      },
      {
        request: {
          query: LikePostDocument,
          variables: {
            postId: mockPost.id,
          },
        },
        result: {
          data: {
            likePost: mockPost.id,
          },
        },
      },
      {
        request: {
          query: UnlikePostDocument,
          variables: {
            postId: mockPost.id,
          },
        },
        result: {
          data: {
            unlikePost: mockPost.id,
          },
        },
      },
    ]);
    mockAuth(1);

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <PostLikes isCurrentUserPost={false} post={mockPost} />
          </ApolloProvider>
        </ThemeProvider>
      ).getByTestId;
    });

    const postLikesNumber = await waitFor(() =>
      getByTestId('post-likes-number')
    );
    const postLikeButton = await waitFor(
      () => getByTestId('post-like-button') as HTMLButtonElement
    );

    const initialLikesNumber = mockPost.likes;
    await waitFor(() =>
      expect(postLikesNumber).toHaveTextContent(`${initialLikesNumber} Likes`)
    );
    act(() => {
      fireEvent.click(postLikeButton);
    });

    await waitFor(() =>
      expect(postLikesNumber).toHaveTextContent(
        `${initialLikesNumber + 1} Likes`
      )
    );

    const postUnlikeButton = await waitFor(
      () => getByTestId('post-unlike-button') as HTMLButtonElement
    );

    act(() => {
      fireEvent.click(postUnlikeButton);
    });

    await waitFor(() =>
      expect(postLikesNumber).toHaveTextContent(`${initialLikesNumber} Likes`)
    );
  });
});
