/**
 * Safe SQL query helpers.
 *
 * - Parameterized queries only (no string interpolation of user input)
 * - All query functions are server-side only
 */
import sql from './client';

/**
 * Runs a raw parameterized query and returns typed rows.
 *
 * Example:
 *   const rows = await query<TeamRow>('SELECT * FROM teams WHERE id = $1', [id]);
 */
export async function query<T>(queryString: string, params: unknown[] = []): Promise<T[]> {
  // neon's tagged-template driver doesn't support positional params directly,
  // so we use the sql.query() method for dynamic queries.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (sql as any).query(queryString, params);
  return result.rows as T[];
}
