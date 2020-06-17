import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import sql from 'sql-template-strings';
import { Database } from '../common/database.provider';
import { Post } from '../../db';
import DataLoader from 'dataloader';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import {
  validateEmail,
  validateLength,
  validatePassword,
} from '../../validators';

type PostById = { postId: string };
type PostsKey = PostById;

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
          if (this.postsCache.has(query.postId)) {
            return [this._readPostFromCache(query.postId)];
          }

          return this._findPostById(query.postId);
        })
      );
    }),
  };
  async lastPosts() {
    const { rows } = await this.db.query(sql`
      SELECT * FROM posts 
      ORDER BY created_at DESC 
      LIMIT 50
    `);

    return rows || null;
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

  async findPostsByUser(userId: string) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts
      WHERE posts.user_id = ${userId}
    `);

    return rows;
  }

  async findPostsLikedByUser(userId: string) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts, posts_liked_users
      WHERE posts_liked_users.user_id = ${userId}
      AND posts.user_id = ${userId}
    `);

    return rows;
  }

  async getPostLikes(postId: string) {
    const { rows } = await this.db.query(sql`
      SELECT COUNT(*) FROM posts_liked_users
      WHERE posts_liked_users.post_id = ${postId}
    `);

    return Number(rows[0].count);
  }

  async addPost({
    title,
    picture,
    description,
    content,
    userId,
  }: {
    title: string;
    picture?: string | null | undefined;
    description: string;
    content: string;
    userId: string;
  }) {
    validateLength('Title', title, 5, 150);
    validateLength('Description', description, 10, 500);
    validateLength('Content', content, 10, 30000);

    if (picture) {
      validateLength('Picture', picture, 5, 1000);
    } else {
      picture = `https://source.unsplash.com/1600x900/?${title.charAt(0)}`;
    }

    const { rows } = await this.db.query(sql`
        INSERT INTO posts( title, picture, description, content, user_id)
        VALUES(${title}, ${picture}, ${description}, ${content}, ${userId})
        RETURNING *
      `);
    return rows[0];
  }

  async removePost(postId: string) {
    try {
      await this.db.query('BEGIN');
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
