import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';
import commonModule from '../common';
import usersModule from '../users';
import { Resolvers } from '../../types/graphql';
import { Auth } from './../users/auth.provider';
import { Posts } from './posts.provider';

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    picture: URL
    description: String!
    content: String!
    createdAt: DateTime!
    likes: Int!
    user: User
  }

  extend type Query {
    post(postId: ID!): Post
    posts: [Post!]!
    userPosts(userId: ID!): [Post!]!
    userLikedPosts(userId: ID!): [Post!]!
  }

  extend type Mutation {
    addPost(
      title: String!
      picture: String!
      description: String!
      content: String!
    ): Post
    removePost(postId: ID!): ID
  }
`;

const resolvers: Resolvers = {
  Query: {
    async post(root, { postId }, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector.get(Posts).findPostById(postId);
    },

    async posts(root, args, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return [];

      return injector.get(Posts).lastPosts();
    },

    async userPosts(root, { userId }, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector.get(Posts).findPostsByUser(userId);
    },

    async userLikedPosts(root, { userId }, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector.get(Posts).findPostsLikedByUser(userId);
    },
  },

  Mutation: {
    async addPost(
      root,
      { title, picture, description, content },
      { injector }
    ) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector.get(Posts).addPost({
        title,
        picture,
        description,
        content,
        userId: currentUser.id,
      });
    },

    async removePost(root, { postId }, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector.get(Posts).removePost(postId);
    },
  },
};

export default new GraphQLModule({
  name: 'posts',
  typeDefs,
  resolvers,
  imports: () => [commonModule, usersModule],
  providers: () => [Posts],
});
