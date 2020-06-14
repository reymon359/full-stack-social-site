import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import sql from 'sql-template-strings';
import bcrypt from 'bcrypt';
import { Database } from '../common/database.provider';
import DataLoader from 'dataloader';
import { QueryResult } from 'pg';
import { User } from '../../db';

type UserByUsername = { username: string };
type UsersKey = UserByUsername;

@Injectable({
  scope: ProviderScope.Session,
})
export class Users {
  @Inject() private db: Database;

  private usersCache = new Map<string, User>();
  private loaders = {
    users: new DataLoader<UsersKey, QueryResult['rows']>((keys) => {
      return Promise.all(
        keys.map(async (query) => {
          if (this.usersCache.has(query.username)) {
            return [this._readUserFromCache(query.username)];
          }

          return this._findUserByUsername(query.username);
        })
      );
    }),
  };

  async findById(userId: string) {
    const { rows } = await this.db.query(
      sql`SELECT * FROM users WHERE id = ${userId}`
    );

    return rows[0] || null;
  }

  async findAllExcept(userId: string) {
    const { rows } = await this.db.query(
      sql`SELECT * FROM users WHERE id != ${userId}`
    );

    return rows;
  }

  async findUserByUsername(username: string) {
    const rows = await this.loaders.users.load({ username });
    return rows[0] || null;
  }

  private async _findUserByUsername(username: string) {
    const { rows } = await this.db.query(sql`
      SELECT * FROM users WHERE username = ${username}
    `);

    this._writeUserToCache(rows[0]);

    return rows;
  }

  async findByEmail(email: string) {
    const { rows } = await this.db.query(
      sql`SELECT * FROM users WHERE email = ${email}`
    );

    return rows[0] || null;
  }

  async newUser({
    name,
    username,
    email,
    password,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const defaultUserBio = `My lucky number🍀 is the ${Math.floor(
      Math.random() * 100
    )} and I joined this site on ${new Date().toUTCString()}.`;
    const defaultUserPicture = `https://robohash.org/${username}?set=set5`;

    const createdUserQuery = await this.db.query(sql`
        INSERT INTO users(name, username, email, password, bio, picture)
        VALUES(${name}, ${username}, ${email}, ${passwordHash}, ${defaultUserBio}, 
        ${defaultUserPicture})
        RETURNING *
      `);
    const user = createdUserQuery.rows[0];

    return user;
  }

  private _readUserFromCache(username: string) {
    return this.usersCache.get(username);
  }

  private _writeUserToCache(user?: User) {
    if (user) {
      this.usersCache.set(user.username, user);
    }
  }
}
