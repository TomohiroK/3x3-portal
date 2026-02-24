/**
 * Neon serverless Postgres client.
 *
 * DATABASE_URL must be set as a server-side environment variable.
 * Never import this file from client components.
 */
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Check your .env.local or Vercel environment variables.');
}

/**
 * Tagged-template SQL client from Neon serverless driver.
 * Use as: `await sql\`SELECT * FROM teams WHERE id = ${id}\``
 *
 * Neon's driver handles connection pooling over HTTP for serverless environments.
 */
const sql = neon(process.env.DATABASE_URL);

export default sql;
