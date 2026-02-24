/**
 * Safe SQL query helpers.
 *
 * - Parameterized queries only (no string interpolation of user input)
 * - All query functions are server-side only
 */
import { getSql } from './client';

/**
 * Runs a raw parameterized query and returns typed rows.
 *
 * Example:
 *   const rows = await query<TeamRow>('SELECT * FROM teams WHERE id = $1', [id]);
 */
export async function query<T>(queryString: string, params: unknown[] = []): Promise<T[]> {
  const sql = getSql();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (sql as any).query(queryString, params);
  return result.rows as T[];
}
