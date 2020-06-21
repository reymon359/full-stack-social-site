import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { server } from '../../server';
import { resetDb } from '../../db';
import { mockAuth } from '../mocks/auth.provider';

describe('Query.userPosts', () => {
  beforeEach(resetDb);

  it('should fetch the user posts', async () => {
    mockAuth(1);
    const { query } = createTestClient(server);

    const res = await query({
      variables: { userId: '2' },
      query: gql`
        query GetUserPosts($userId: ID!) {
          userPosts(userId: $userId) {
            id
            title
            picture
            description
            content
            createdAt
            likes
            user {
              id
              name
              picture
            }
          }
        }
      `,
    });
    console.log(res);

    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});
