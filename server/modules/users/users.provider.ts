import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import sql from 'sql-template-strings';
import bcrypt from 'bcrypt';
import { Database } from '../common/database.provider';

@Injectable({
  scope: ProviderScope.Session,
})
export class Users {
  @Inject() private db: Database;

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

  async findByUsername(username: string) {
    const { rows } = await this.db.query(
      sql`SELECT * FROM users WHERE username = ${username}`
    );

    return rows[0] || null;
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
    const defaultUserBio =
      `My lucky number is ${Math.floor(Math.random() * 100)} and I joined this site on ${new Date().toUTCString}.`;
    const defaultUserPicture = `https://robohash.org/${username}?set=set5`;

    const createdUserQuery = await this.db.query(sql`
        INSERT INTO users(name, username, email, password, bio, followers, following, picture)
        VALUES(${name}, ${username}, ${email}, ${passwordHash}, ${defaultUserBio}, 
        0, 0, ${defaultUserPicture})
        RETURNING *
      `);
    const user = createdUserQuery.rows[0];

    return user;
  }
}
