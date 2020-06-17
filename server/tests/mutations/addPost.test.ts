import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { server } from '../../server';
import { resetDb } from '../../db';
import { mockAuth } from '../mocks/auth.provider';

describe('Mutation.addPost', () => {
  beforeEach(resetDb);

  it('should add a new Post', async () => {
    mockAuth(1);

    const { query, mutate } = createTestClient(server);

    const addPostRes = await mutate({
      variables: {
        title: 'new post title',
        picture:
          'https://images.unsplash.com/photo-1575713076235-8a4ea6500645?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        description: 'new post emadescription',
        content: 'new post content',
      },
      mutation: gql`
        mutation addPost(
          $title: String!
          $picture: String
          $description: String!
          $content: String!
        ) {
          addPost(
            title: $title
            picture: $picture
            description: $description
            content: $content
          ) {
            id
          }
        }
      `,
    });

    expect(addPostRes.data).toBeDefined();
    expect(addPostRes.errors).toBeUndefined();
    expect(addPostRes.data).toMatchSnapshot();

    const getPostRes = await query({
      variables: { postId: addPostRes.data.addPost.id },
      query: gql`
        query GetPost($postId: ID!) {
          post(postId: $postId) {
            id
            title
            picture
            description
            content
            likes
            user {
              id
              username
            }
          }
        }
      `,
    });

    expect(getPostRes.data).toBeDefined();
    expect(getPostRes.errors).toBeUndefined();
    expect(getPostRes.data).toMatchSnapshot();
  });
});
