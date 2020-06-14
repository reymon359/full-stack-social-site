import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';
import commonModule from '../common';
import usersModule from '../users';
import { Resolvers } from '../../types/graphql';
import { Auth } from './../users/auth.provider';
import { Posts } from './posts.provider';
import { Users } from '../users/users.provider';

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
    lastPosts: [Post!]!
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
    editPost(
      title: String!
      picture: String!
      description: String!
      content: String!
    ): Post
    removePost(postId: ID!): String
    likePost(postId: ID!): Post
    unlikePost(postId: ID!): Post
  }

  extend type Subscription {
    postLiked: Post!
    postAdded: Post!
    postRemoved: ID!
  }
`;

const resolvers: Resolvers = {
  Post: {
    createdAt(post) {
      return new Date(post.created_at);
    },
    async likes(post, args, { injector }) {
      // TODO: implement provider method
      return Math.floor(Math.random() * Math.floor(10));
    },

    async user(post, args, { injector }) {
      return injector.get(Users).findById(post.user_id);
    },
  },

  Query: {
    async post(root, { postId }, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector.get(Posts).findPostById(postId);
    },

    async lastPosts(root, args, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return [];

      return injector.get(Posts).lastPosts();
    },

    // async userPosts(root, { userId }, { injector }) {
    //   const currentUser = await injector.get(Auth).currentUser();
    //
    //   if (!currentUser) return null;
    //
    //   return injector.get(Posts).findPostsByUser(userId);
    // },
    //
    // async userLikedPosts(root, { userId }, { injector }) {
    //   const currentUser = await injector.get(Auth).currentUser();
    //
    //   if (!currentUser) return null;
    //
    //   return injector.get(Posts).findPostsLikedByUser(userId);
    // },
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
