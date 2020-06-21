import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { server } from '../../server';
import { resetDb } from '../../db';
import { mockAuth } from '../mocks/auth.provider';

describe('Mutation.likePost', () => {
  beforeEach(resetDb);

  it('should like a Post just once properly', async () => {
    mockAuth(1);
    const { query, mutate } = createTestClient(server);

    const mockPostId = 1;
    const getPostRes = await query({
      variables: { postId: mockPostId },
      query: gql`
        query GetPost($postId: ID!) {
          post(postId: $postId) {
            likes
          }
        }
      `,
    });
    const postLikes = getPostRes.data.post.likes;

    const likePostRes = await mutate({
      variables: { postId: mockPostId },
      mutation: gql`
        mutation LikePost($postId: ID!) {
          likePost(postId: $postId)
        }
      `,
    });

    expect(likePostRes.data).toBeDefined();
    expect(likePostRes.errors).toBeUndefined();
    expect(likePostRes.data).toMatchSnapshot();

    const getPostAgainRes = await query({
      variables: { postId: mockPostId },
      query: gql`
        query GetPost($postId: ID!) {
          post(postId: $postId) {
            likes
          }
        }
      `,
    });
    expect(getPostAgainRes.data.post.likes).toEqual(postLikes + 1);

    const likePostAgainRes = await mutate({
      variables: { postId: mockPostId },
      mutation: gql`
        mutation LikePost($postId: ID!) {
          likePost(postId: $postId)
        }
      `,
    });
    expect(likePostAgainRes.data.likePost).toEqual(null);
  });
});
