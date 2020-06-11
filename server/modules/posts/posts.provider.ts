import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import sql from 'sql-template-strings';
import { Database } from '../common/database.provider';

@Injectable({
  scope: ProviderScope.Session,
})
export class Posts {
  @Inject() private db: Database;

  async lastPosts() {
    const { rows } = await this.db.query(sql`
      SELECT * FROM posts 
      ORDER BY created_at DESC 
      LIMIT 50
    `);

    return rows[0] || null;
  }

  async findPostById(postId: string) {
    const { rows } = await this.db.query(sql`
      SELECT * FROM posts WHERE id = ${postId}
    `);

    return rows[0] || null;
  }

  async findPostsByUser(userId: string) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts
      WHERE posts.user_id = ${userId}
    `);

    return rows || null;
  }

  private async findPostsLikedByUser(userId: string) {
    const { rows } = await this.db.query(sql`
      SELECT posts.* FROM posts, posts_liked_users
      WHERE posts_liked_users.user_id = ${userId}
      AND posts.user_id = ${userId}
    `);

    return rows || null;
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
      // const { rows } = await this.db.query(sql`
      //   SELECT posts.* FROM posts, posts_liked_users
      //   WHERE post_id = ${postId}
      //   AND user.id = posts_liked_users.post_id
      // `);
      // const post = rows[0];
      // if (!post) {
      //   await this.db.query('ROLLBACK');
      //   return null;
      // }
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
}
