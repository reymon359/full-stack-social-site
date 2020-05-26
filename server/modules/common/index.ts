import { GraphQLModule } from '@graphql-modules/core';
import { ProviderScope } from '@graphql-modules/di';
import { gql } from 'apollo-server-express';
import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { Pool } from 'pg';
import { pool } from '../../db';
import { Resolvers } from '../../types/graphql';
import { Database } from './database.provider';
import { PubSub } from './pubsub.provider';
import {
  postgresHost, postgresPort,
  postgresUser, postgresPassword, postgresDb
} from '../../env';

const { PostgresPubSub } = require('graphql-postgres-subscriptions');

const typeDefs = gql`
  scalar DateTime
  scalar URL

  type Query {
    _dummy: Boolean
  }

  type Mutation {
    _dummy: Boolean
  }

  type Subscription {
    _dummy: Boolean
  }
`;

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  URL: URLResolver,
};

const pubsub = new PostgresPubSub({
  host: postgresHost,
  port: postgresPort,
  user: postgresUser,
  password: postgresPassword,
  database: postgresDb,
});

pubsub.ee.setMaxListeners(0); // raise max listeners in event emitter, 0 mean that is limited

export default new GraphQLModule({
  name: 'common',
  typeDefs,
  resolvers,
  providers: () => [
    {
      provide: Pool,
      useValue: pool,
    },
    {
      provide: PubSub,
      scope: ProviderScope.Application,
      useValue: pubsub,
    },
    Database,
  ],
});
