import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { server } from '../../server';
import { resetDb } from '../../db';
import { mockAuth } from '../mocks/auth.provider';

describe('Query.user', () => {
  beforeEach(resetDb);

  it('should fetch specified user by username', async () => {
    mockAuth(1);

    const { query } = createTestClient(server);

    const res = await query({
      variables: { username: 'uri' },
      query: gql`
        query GetUser($username: String!) {
          user(username: $username) {
            id
            name
            username
            picture
            email
            bio
            followers
            following
          }
        }
      `,
    });

    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});
