import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';
import commonModule from '../common';
import { Resolvers } from '../../types/graphql';
import { Users } from './users.provider';
import { Auth } from './auth.provider';
import { Chats } from '../chats/chats.provider';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    bio: String
    followers: Int!
    following: Int!
    picture: URL
  }

  extend type Query {
    me: User
    user(username: String!): User
    users: [User!]!
    followers(userId: String!): [User!]!
    following(userId: String!): [User!]!
  }

  extend type Mutation {
    signIn(email: String!, password: String!): User
    signUp(
      name: String!
      username: String!
      email: String!
      password: String!
      passwordConfirm: String!
    ): User
    editUser(
      name: String!
      username: String!
      email: String!
      bio: String!
      password: String!
      passwordNew: String!
      passwordNewConfirm: String!
    ): User
    follow(userId: String!): User
    unfollow(userId: String!): User
  }

  extend type Subscription {
    userFollowed: User!
  }
`;

const resolvers: Resolvers = {
  User: {
    async followers(user, args, { injector }) {
      // TODO: implement provider method
      return Math.floor(Math.random() * Math.floor(10));
    },

    async following(user, args, { injector }) {
      // TODO: implement provider method
      return Math.floor(Math.random() * Math.floor(10));
    },
  },

  Query: {
    me(root, args, { injector }) {
      return injector.get(Auth).currentUser();
    },
    async user(root, { username }, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return null;

      return injector.get(Users).findUserByUsername(username);
    },
    async users(root, args, { injector }) {
      const currentUser = await injector.get(Auth).currentUser();

      if (!currentUser) return [];

      return injector.get(Users).findAllExcept(currentUser.id);
    },
  },
  Mutation: {
    async signIn(root, { email, password }, { injector }) {
      return injector.get(Auth).signIn({ email, password });
    },

    async signUp(
      root,
      { name, username, email, password, passwordConfirm },
      { injector }
    ) {
      return injector
        .get(Auth)
        .signUp({ name, username, email, password, passwordConfirm });
    },
  },
};

export default new GraphQLModule({
  name: 'users',
  typeDefs,
  resolvers,
  imports: () => [commonModule],
  providers: () => [Users, Auth],
});
