import type { NewsArticle } from '@/types/domain';

export interface NewsRow {
  id: number;
  title: string;
  summary: string | null;
  source_url: string | null;
  image: string | null;
  date: string;
  updated_at: string | null;
  /**
   * DB実装時は JSON_AGG などで複数チームを集約して渡す。
   * 例: SELECT ..., json_agg(json_build_object('id', t.id, 'name', t.name)) AS related_teams
   *     FROM news n LEFT JOIN news_teams nt ON nt.news_id = n.id LEFT JOIN teams t ON t.id = nt.team_id
   */
  related_teams: Array<{ id: number; name: string }> | null;
}

function slugify(text: string, id: number): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') +
    `-${id}`
  );
}

export function mapNewsRowToArticle(row: NewsRow): NewsArticle {
  return {
    id: row.id,
    slug: slugify(row.title, row.id),
    title: row.title,
    summary: row.summary,
    sourceUrl: row.source_url ?? null,
    imageUrl: row.image,
    publishedAt: row.date,
    updatedAt: row.updated_at ?? new Date().toISOString(),
    relatedTeams: row.related_teams ?? [],
  };
}
