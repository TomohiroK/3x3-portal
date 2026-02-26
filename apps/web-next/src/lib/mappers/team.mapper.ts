import type { Team, TeamCategory } from '@/types/domain';

export interface TeamRow {
  id: number;
  name: string;
  location: string;
  category: string | null;
  image: string | null;
  website_url: string | null;
  x_account: string | null;
  instagram_account: string | null;
  tiktok_account: string | null;
  updated_at: string | null;
}

const VALID_CATEGORIES: TeamCategory[] = ['EXE', '代表', 'U23', '招待', '一般クラブ'];

function toTeamCategory(raw: string | null): TeamCategory {
  return VALID_CATEGORIES.includes(raw as TeamCategory) ? (raw as TeamCategory) : '一般クラブ';
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

export function mapTeamRowToTeam(row: TeamRow): Team {
  return {
    id: row.id,
    slug: slugify(row.name, row.id),
    name: row.name,
    location: row.location,
    category: toTeamCategory(row.category),
    imageUrl: row.image,
    websiteUrl: row.website_url ?? null,
    xAccount: row.x_account,
    instagramAccount: row.instagram_account,
    tiktokAccount: row.tiktok_account,
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}
