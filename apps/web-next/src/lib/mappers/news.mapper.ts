import type { NewsArticle } from '@/types/domain';

export interface NewsRow {
  id: number;
  title: string;
  summary: string | null;
  source_url: string | null;
  image: string | null;
  date: string;
  updated_at: string | null;
  team_id: number | null;
  team_name: string | null;
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
    relatedTeamId: row.team_id,
    relatedTeamName: row.team_name,
  };
}
