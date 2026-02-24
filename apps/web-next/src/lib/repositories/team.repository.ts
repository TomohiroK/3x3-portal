/**
 * Team repository — server-side only.
 */
import type { Team, TeamFilters, PaginatedResult } from '@/types/domain';
import { query } from '@/lib/db/query';
import { mapTeamRowToTeam, type TeamRow } from '@/lib/mappers/team.mapper';

export async function listTeams(filters: TeamFilters): Promise<PaginatedResult<Team>> {
  const params: unknown[] = [];
  let idx = 1;
  const conditions: string[] = ['1=1'];

  if (filters.search) {
    conditions.push(
      `(LOWER(name) LIKE LOWER($${idx}) OR LOWER(location) LIKE LOWER($${idx}))`
    );
    params.push(`%${filters.search}%`);
    idx++;
  }

  const where = conditions.join(' AND ');

  const countRows = await query<{ count: string }>(
    `SELECT COUNT(*) AS count FROM teams WHERE ${where}`,
    params
  );
  const total = parseInt(countRows[0]?.count ?? '0', 10);

  const offset = (filters.page - 1) * filters.pageSize;
  const dataRows = await query<TeamRow>(
    `SELECT * FROM teams WHERE ${where} ORDER BY name ASC LIMIT $${idx} OFFSET $${idx + 1}`,
    [...params, filters.pageSize, offset]
  );

  return {
    items: dataRows.map(mapTeamRowToTeam),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function getTeamById(id: number): Promise<Team | null> {
  const rows = await query<TeamRow>(`SELECT * FROM teams WHERE id = $1 LIMIT 1`, [id]);
  return rows.length > 0 ? mapTeamRowToTeam(rows[0]) : null;
}

export async function getAllTeams(): Promise<Team[]> {
  const rows = await query<TeamRow>(`SELECT * FROM teams ORDER BY name ASC`);
  return rows.map(mapTeamRowToTeam);
}
