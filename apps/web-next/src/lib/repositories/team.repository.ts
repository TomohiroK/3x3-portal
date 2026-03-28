/**
 * Team repository — reads from JSON data file.
 * Scheduled task updates src/data/teams/teams.json.
 */
import type { Team, TeamFilters, PaginatedResult } from '@/types/domain';
import teamsData from '@/data/teams/teams.json';

const teams: Team[] = teamsData as Team[];

export async function listTeams(filters: TeamFilters): Promise<PaginatedResult<Team>> {
  let result = teams;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    result = result.filter((t) => t.category === filters.category);
  }

  const total = result.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = result.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}

export async function getTeamById(id: number): Promise<Team | null> {
  return teams.find((t) => t.id === id) ?? null;
}

export async function getAllTeams(): Promise<Team[]> {
  return [...teams].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getTeamsByIds(ids: number[]): Promise<Team[]> {
  if (ids.length === 0) return [];
  // 元の ids の順序を保持して返す
  return ids
    .map((id) => teams.find((t) => t.id === id))
    .filter((t): t is Team => t !== undefined);
}
