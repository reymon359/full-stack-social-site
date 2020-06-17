import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { server } from '../../server';
import { resetDb } from '../../db';
import { mockAuth } from '../mocks/auth.provider';

describe('Mutation.removePost', () => {
  beforeEach(resetDb);

  it('removes post by id', async () => {
    mockAuth(1);

    const { query, mutate } = createTestClient(server);

    const addPostRes = await mutate({
      variables: { postId: '1' },
      mutation: gql`
        mutation RemovePost($postId: ID!) {
          removePost(postId: $postId)
        }
      `,
    });

    expect(addPostRes.data).toBeDefined();
    expect(addPostRes.errors).toBeUndefined();
    expect(addPostRes.data!.removePost).toEqual('1');

    const getPostRes = await query({
      variables: { postId: '1' },
      query: gql`
        query GetPost($postId: ID!) {
          post(postId: $postId) {
            id
            title
            picture
            description
            content
            createdAt
            likes
            user {
              id
              username
            }
          }
        }
      `,
    });

    expect(addPostRes.data).toBeDefined();
    expect(getPostRes.errors).toBeUndefined();
    expect(addPostRes.data!.post).toBeUndefined();
  });
});
