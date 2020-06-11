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
    posts: [Post!]!
    post(postID: ID!): Post
    postsLiked(userID: ID!): [Post!]!
  }

  extend type Mutation {
    addPost(userId: ID!): Post
    removePost(postId: ID!): ID
  }
`;

const resolvers: Resolvers = {
  Post: {
    async title(post, args, { injector }) {
      return injector.get(Posts).id(post.id);
    },

    async title2(post, args, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      const participant = await injector.get(Posts).firstRecipient({
        postId: post.id,
        userId: currentUser.id,
      });

      return participant ? participant.name : null;
    },

    async picture(post, args, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      const participant = await injector.get(Posts).firstRecipient({
        postId: post.id,
        userId: currentUser.id,
      });

      return participant && participant.picture
        ? participant.picture
        : injector.get(UnsplashApi).getRandomPhoto();
    },

    async messages(post, args, { injector }) {
      return injector.get(Posts).findMessagesByPost({
        postId: post.id,
        limit: args.limit,
        after: args.after,
      });
    },

    async lastMessage(post, args, { injector }) {
      return injector.get(Posts).lastMessage(post.id);
    },

    async participants(post, args, { injector }) {
      return injector.get(Posts).participants(post.id);
    },
  },

  Query: {
    async posts(root, args, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return [];

      return injector.get(Posts).findPostsByUser(currentUser.id);
    },

    async post(root, { postId }, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector
        .get(Posts)
        .findPostByUser({ postId, userId: currentUser.id });
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

      return injector.get(Posts).removePost({ postId, userId: currentUser.id });
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
