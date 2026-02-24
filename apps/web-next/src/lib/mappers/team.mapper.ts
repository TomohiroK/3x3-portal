import type { Team } from '@/types/domain';

export interface TeamRow {
  id: number;
  name: string;
  location: string;
  image: string | null;
  x_account: string | null;
  instagram_account: string | null;
  tiktok_account: string | null;
  updated_at: string | null;
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
    imageUrl: row.image,
    xAccount: row.x_account,
    instagramAccount: row.instagram_account,
    tiktokAccount: row.tiktok_account,
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}
