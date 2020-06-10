import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import { QueryResult } from 'pg';
import sql from 'sql-template-strings';
import DataLoader from 'dataloader';
import format from 'date-fns/format';
import { Database } from '../common/database.provider';
import { Post } from '../../db';
import bcrypt from 'bcrypt';

type PostsByUser = { userId: string };
type PostByUser = { userId: string; postId: string };
type PostById = { postId: string };
type PostsKey = PostById | PostByUser | PostsByUser;

function isPostsByUser(query: any): query is PostsByUser {
  return query.userId && !query.postId;
}

function isPostByUser(query: any): query is PostByUser {
  return query.userId && query.postId;
}

@Injectable({
  scope: ProviderScope.Session,
})
export class Posts {
  @Inject() private db: Database;

  private postsCache = new Map<string, Post>();
  private loaders = {
    posts: new DataLoader<PostsKey, QueryResult['rows']>((keys) => {
      return Promise.all(
        keys.map(async (query) => {
          if (isPostsByUser(query)) {
            return this._findPostsByUser(query.userId);
          }

          if (this.postsCache.has(query.postId)) {
            return [this._readPostFromCache(query.postId)];
          }

          if (isPostByUser(query)) {
            return this._findPostByUser(query);
          }

          return this._findPostById(query.postId);
        })
      );
    }),
  };

  async findPostsByUser(userId: string) {
    return this.loaders.posts.load({ userId });
  }

  private async _findPostsByUser(userId: string) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts, posts_users
      WHERE posts.id = posts_users.post_id
      AND posts_users.user_id = ${userId}
    `);

    rows.forEach((row) => {
      this._writePostToCache(row);
    });

    return rows;
  }

  async findPostByUser({ postId, userId }: { postId: string; userId: string }) {
    const rows = await this.loaders.posts.load({ postId, userId });

    return rows[0] || null;
  }

  private async _findPostByUser({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts, posts_users
      WHERE posts_users.post_id = ${postId}
      AND posts.id = posts_users.post_id
      AND posts_users.user_id = ${userId}
    `);

    this._writePostToCache(rows[0]);

    return rows;
  }

  async findPostById(postId: string) {
    const rows = await this.loaders.posts.load({ postId });
    return rows[0] || null;
  }

  private async _findPostById(postId: string) {
    const { rows } = await this.db.query(sql`
      SELECT * FROM posts WHERE id = ${postId}
    `);

    this._writePostToCache(rows[0]);

    return rows;
  }

  async addPost({
    title,
    picture,
    description,
    content,
    userId,
  }: {
    title: string;
    picture: string;
    description: string;
    content: string;
    userId: string;
  }) {
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const defaultUserBio = `My lucky number🍀 is the ${Math.floor(
      Math.random() * 100
    )} and I joined this site on ${new Date().toUTCString()}.`;
    const defaultUserPicture = `https://robohash.org/${username}?set=set5`;

    const createdPostQuery = await this.db.query(sql`
        INSERT INTO users(name, username, email, password, bio, followers, following, picture)
        VALUES(${name}, ${username}, ${email}, ${passwordHash}, ${defaultPostBio}, 
        0, 0, ${defaultPostPicture})
        RETURNING *
      `);
    const postAdded = createdPostQuery.rows[0];

    return postAdded;
  }

  async removePost({ postId, userId }: { postId: string; userId: string }) {
    try {
      await this.db.query('BEGIN');

      const { rows } = await this.db.query(sql`
        SELECT posts.* FROM posts, posts_users
        WHERE id = ${postId}
        AND posts.id = posts_users.post_id
        AND posts_users.user_id = ${userId}
      `);

      const post = rows[0];

      if (!post) {
        await this.db.query('ROLLBACK');
        return null;
      }

      await this.db.query(sql`
        DELETE FROM posts WHERE posts.id = ${postId}
      `);

      await this.db.query('COMMIT');

      return postId;
    } catch (e) {
      await this.db.query('ROLLBACK');
      throw e;
    }
  }

  private _readPostFromCache(postId: string) {
    return this.postsCache.get(postId);
  }

  private _writePostToCache(post?: Post) {
    if (post) {
      this.postsCache.set(post.id, post);
    }
  }
}

function cursorToDate(cursor: number) {
  return `'${format(cursor, 'yyyy-MM-dd HH:mm:ss')}'`;
}
