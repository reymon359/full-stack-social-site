import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';
import commonModule from '../common';
import { Resolvers } from '../../types/graphql';
import { Users } from './users.provider';
import { Auth } from './auth.provider';

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
  }
`;

const resolvers: Resolvers = {
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
