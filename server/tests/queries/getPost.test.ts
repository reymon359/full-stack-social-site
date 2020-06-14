import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { server } from '../../server';
import { resetDb } from '../../db';
import { mockAuth } from '../mocks/auth.provider';

describe('Query.post', () => {
  beforeEach(resetDb);

  it('should fetch specified post', async () => {
    mockAuth(1);

    const { query } = createTestClient(server);

    const res = await query({
      variables: { postId: '1' },
      query: gql`
        query Post($postId: ID!) {
          post(postId: $postId) {
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

    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});
