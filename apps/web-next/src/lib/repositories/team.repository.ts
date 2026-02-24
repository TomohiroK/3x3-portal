/**
 * Team repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { Team, TeamFilters, PaginatedResult } from '@/types/domain';

const MOCK_TEAMS: Team[] = [
  {
    id: 1,
    slug: 'shinagawa-city-3x3-1',
    name: 'SHINAGAWA CITY 3x3 BASKETBALL CLUB',
    location: '東京都',
    imageUrl: null,
    websiteUrl: 'https://www.shinagawa-city.com/3x3basketball/',
    xAccount: 'scbc_3x3',
    instagramAccount: 'shinagawacity3x3basketball',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 2,
    slug: 'flowlish-gunma-2',
    name: 'FLOWLISH GUNMA',
    location: '群馬県',
    imageUrl: null,
    websiteUrl: 'https://flowlish-gunma.com/',
    xAccount: 'flowlish3x3',
    instagramAccount: 'flowlish3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
];

export async function listTeams(filters: TeamFilters): Promise<PaginatedResult<Team>> {
  let result = MOCK_TEAMS;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
    );
  }

  const total = result.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = result.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}

export async function getTeamById(id: number): Promise<Team | null> {
  return MOCK_TEAMS.find((t) => t.id === id) ?? null;
}

export async function getAllTeams(): Promise<Team[]> {
  return [...MOCK_TEAMS].sort((a, b) => a.name.localeCompare(b.name));
}
