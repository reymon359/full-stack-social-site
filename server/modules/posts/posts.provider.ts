import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import { QueryResult } from 'pg';
import sql from 'sql-template-strings';
import DataLoader from 'dataloader';
import { Database } from '../common/database.provider';
import { Post } from '../../db';

type PostsByUser = { userId: string };
type PostsLikedByUser = { userId: string };
type PostById = { postId: string };
type PostsKey = PostById | PostsByUser | PostsLikedByUser;

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
          if (isPostByUser(query)) {
            return this._findPostByUser(query.userId);
          }

          if (isPostsByUser(query)) {
            return this._findPostsByUser(query.userId);
          }

          if (this.postsCache.has(query.postId)) {
            return [this._readPostFromCache(query.postId)];
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

  async findPostByUser({ userId }: { userId: string }) {
    const rows = await this.loaders.posts.load({ userId });
    return rows[0] || null;
  }
  private async _findPostByUser({ userId }: { userId: string }) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts, posts_users
      WHERE posts.user_id = ${userId}
    `);
    this._writePostToCache(rows[0]);
    return rows;
  }

  async findPostLikedByUser(userId: string) {
    const rows = await this.loaders.posts.load({ userId });
    return rows[0] || null;
  }
  private async _findPostLikedByUser(userId: string) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts, posts_liked_users
      WHERE posts_liked_users.user_id = ${userId}
      AND posts.user_id = ${userId}
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
    const createdPostQuery = await this.db.query(sql`
        INSERT INTO users( title, picture, description, content, likes, userId)
        VALUES(${title}, ${picture}, ${description}, ${content}, 0, ${userId});
        RETURNING *
      `);
    const postAdded = createdPostQuery.rows[0];
    return postAdded;
  }

  async removePost(postId: string) {
    try {
      await this.db.query('BEGIN');
      const { rows } = await this.db.query(sql`
        SELECT posts.* FROM posts, posts_liked_users
        WHERE id = ${postId}
        AND posts.id = posts_liked_users.post_id
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
