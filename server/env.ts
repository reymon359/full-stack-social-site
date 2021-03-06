import { config } from 'dotenv';
config();

export const expiration = process.env.JWT_EXPIRATION_MS
  ? parseInt(process.env.JWT_EXPIRATION_MS)
  : 24 * 60 * 60 * 1000;
export const secret = process.env.JWT_SECRET || '70p53cr37';
export const origin = process.env.ORIGIN || 'http://localhost:3000';
export const port = process.env.PORT || 4000;
export const resetDb = process.env.RESET_DB || false;
export const fakedDb = process.env.FAKED_DB
  ? parseInt(process.env.FAKED_DB, 10)
  : 0;


export const postgresHost = process.env.POSTGRES_HOST || 'localhost';
export const postgresPort = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432;
export const postgresUser = process.env.POSTGRES_USER || 'testuser';
export const postgresPassword = process.env.POSTGRES_PASSWORD || 'testpassword';
export const postgresDb = process.env.POSTGRES_DB || 'socialsite';

