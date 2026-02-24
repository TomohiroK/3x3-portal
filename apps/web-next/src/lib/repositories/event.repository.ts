/**
 * Event repository — server-side only.
 * Reads from the `tournaments` table and maps to PortalEvent domain objects.
 */
import type { PortalEvent, EventFilters, PaginatedResult, EventStatus } from '@/types/domain';
import { query } from '@/lib/db/query';
import { mapTournamentRowToEvent, type TournamentRow } from '@/lib/mappers/event.mapper';

const VALID_STATUSES: EventStatus[] = ['upcoming', 'ongoing', 'completed', 'cancelled'];

export async function listEvents(filters: EventFilters): Promise<PaginatedResult<PortalEvent>> {
  const params: unknown[] = [];
  let idx = 1;

  const conditions: string[] = ['1=1'];

  if (filters.search) {
    conditions.push(
      `(LOWER(name) LIKE LOWER($${idx}) OR LOWER(location) LIKE LOWER($${idx}) OR LOWER(description) LIKE LOWER($${idx}))`
    );
    params.push(`%${filters.search}%`);
    idx++;
  }

  if (filters.status && VALID_STATUSES.includes(filters.status as EventStatus)) {
    conditions.push(`status = $${idx}`);
    params.push(filters.status);
    idx++;
  }

  const where = conditions.join(' AND ');

  const countRows = await query<{ count: string }>(
    `SELECT COUNT(*) AS count FROM tournaments WHERE ${where}`,
    params
  );
  const total = parseInt(countRows[0]?.count ?? '0', 10);

  const offset = (filters.page - 1) * filters.pageSize;
  const dataRows = await query<TournamentRow>(
    `SELECT * FROM tournaments WHERE ${where} ORDER BY date ASC LIMIT $${idx} OFFSET $${idx + 1}`,
    [...params, filters.pageSize, offset]
  );

  return {
    items: dataRows.map(mapTournamentRowToEvent),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function getUpcomingEvents(limit = 5): Promise<PortalEvent[]> {
  const rows = await query<TournamentRow>(
    `SELECT * FROM tournaments WHERE date >= CURRENT_DATE ORDER BY date ASC LIMIT $1`,
    [limit]
  );
  return rows.map(mapTournamentRowToEvent);
}

export async function getEventById(id: number): Promise<PortalEvent | null> {
  const rows = await query<TournamentRow>(`SELECT * FROM tournaments WHERE id = $1 LIMIT 1`, [id]);
  return rows.length > 0 ? mapTournamentRowToEvent(rows[0]) : null;
}
