import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { server } from '../../server';
import { resetDb } from '../../db';
import { mockAuth } from '../mocks/auth.provider';

describe('Mutation.unlikePost', () => {
  beforeEach(resetDb);

  it('should unlike a Post just once properly', async () => {
    mockAuth(3);
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

    const unlikePostRes = await mutate({
      variables: { postId: mockPostId },
      mutation: gql`
        mutation UnlikePost($postId: ID!) {
          unlikePost(postId: $postId)
        }
      `,
    });
    expect(unlikePostRes.data).toBeDefined();
    expect(unlikePostRes.errors).toBeUndefined();
    expect(unlikePostRes.data).toMatchSnapshot();

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
    expect(getPostAgainRes.data.post.likes).toEqual(postLikes - 1);

    const unlikePostAgainRes = await mutate({
      variables: { postId: mockPostId },
      mutation: gql`
        mutation UnlikePost($postId: ID!) {
          unlikePost(postId: $postId)
        }
      `,
    });
    expect(unlikePostAgainRes.data.unlikePost).toEqual(null);
  });
});
