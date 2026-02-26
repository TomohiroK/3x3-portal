import type { PortalEvent, EventStatus } from '@/types/domain';

/** Raw DB row from `tournaments` table */
export interface TournamentRow {
  id: number;
  name: string;
  description: string | null;
  location: string;
  country: string | null;
  date: string;
  end_date: string | null;
  status: string | null;
  image: string | null;
  website_url: string | null;
  x_account: string | null;
  instagram_account: string | null;
  tiktok_account: string | null;
  participant_team_ids: number[] | null;
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

function toEventStatus(raw: string | null): EventStatus {
  const valid: EventStatus[] = ['開催予定', '開催中', '終了', '中止'];
  return valid.includes(raw as EventStatus) ? (raw as EventStatus) : '開催予定';
}

export function mapTournamentRowToEvent(row: TournamentRow): PortalEvent {
  return {
    id: row.id,
    slug: slugify(row.name, row.id),
    name: row.name,
    description: row.description,
    location: row.location,
    country: row.country ?? '日本',
    startDate: row.date,
    endDate: row.end_date,
    status: toEventStatus(row.status),
    imageUrl: row.image,
    websiteUrl: row.website_url ?? null,
    xAccount: row.x_account ?? null,
    instagramAccount: row.instagram_account ?? null,
    tiktokAccount: row.tiktok_account ?? null,
    participantTeamIds: row.participant_team_ids ?? [],
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}
