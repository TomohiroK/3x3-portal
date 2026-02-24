/**
 * Neon serverless Postgres client.
 *
 * DATABASE_URL must be set as a server-side environment variable.
 * Never import this file from client components.
 */
import { neon } from '@neondatabase/serverless';

/**
 * Returns a Neon SQL client. Throws at call time (not import time)
 * if DATABASE_URL is not configured, so mock-based paths stay unaffected.
 */
export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Check your .env.local or Vercel environment variables.');
  }
  return neon(process.env.DATABASE_URL);
}
