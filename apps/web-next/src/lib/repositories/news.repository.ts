/**
 * News repository — server-side only.
 */
import type { NewsArticle, NewsFilters, PaginatedResult } from '@/types/domain';
import { query } from '@/lib/db/query';
import { mapNewsRowToArticle, type NewsRow } from '@/lib/mappers/news.mapper';

export async function listNews(filters: NewsFilters): Promise<PaginatedResult<NewsArticle>> {
  const params: unknown[] = [];
  let idx = 1;
  const conditions: string[] = ['1=1'];

  if (filters.search) {
    conditions.push(
      `(LOWER(n.title) LIKE LOWER($${idx}) OR LOWER(n.content) LIKE LOWER($${idx}))`
    );
    params.push(`%${filters.search}%`);
    idx++;
  }

  if (filters.teamId !== null) {
    conditions.push(`n.team_id = $${idx}`);
    params.push(filters.teamId);
    idx++;
  }

  const where = conditions.join(' AND ');

  const countRows = await query<{ count: string }>(
    `SELECT COUNT(*) AS count FROM news n WHERE ${where}`,
    params
  );
  const total = parseInt(countRows[0]?.count ?? '0', 10);

  const offset = (filters.page - 1) * filters.pageSize;
  const dataRows = await query<NewsRow>(
    `SELECT n.*, t.name AS team_name
     FROM news n
     LEFT JOIN teams t ON t.id = n.team_id
     WHERE ${where}
     ORDER BY n.date DESC
     LIMIT $${idx} OFFSET $${idx + 1}`,
    [...params, filters.pageSize, offset]
  );

  return {
    items: dataRows.map(mapNewsRowToArticle),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function getLatestNews(limit = 4): Promise<NewsArticle[]> {
  const rows = await query<NewsRow>(
    `SELECT n.*, t.name AS team_name
     FROM news n
     LEFT JOIN teams t ON t.id = n.team_id
     ORDER BY n.date DESC
     LIMIT $1`,
    [limit]
  );
  return rows.map(mapNewsRowToArticle);
}

export async function getNewsById(id: number): Promise<NewsArticle | null> {
  const rows = await query<NewsRow>(
    `SELECT n.*, t.name AS team_name
     FROM news n
     LEFT JOIN teams t ON t.id = n.team_id
     WHERE n.id = $1 LIMIT 1`,
    [id]
  );
  return rows.length > 0 ? mapNewsRowToArticle(rows[0]) : null;
}
