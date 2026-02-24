import type { PortalEvent, EventStatus } from '@/types/domain';

/** Raw DB row from `tournaments` table */
export interface TournamentRow {
  id: number;
  name: string;
  description: string | null;
  location: string;
  date: string;
  end_date: string | null;
  status: string | null;
  image: string | null;
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
  const valid: EventStatus[] = ['upcoming', 'ongoing', 'completed', 'cancelled'];
  return valid.includes(raw as EventStatus) ? (raw as EventStatus) : 'upcoming';
}

export function mapTournamentRowToEvent(row: TournamentRow): PortalEvent {
  return {
    id: row.id,
    slug: slugify(row.name, row.id),
    name: row.name,
    description: row.description,
    location: row.location,
    startDate: row.date,
    endDate: row.end_date,
    status: toEventStatus(row.status),
    imageUrl: row.image,
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}
