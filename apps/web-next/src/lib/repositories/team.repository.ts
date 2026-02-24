/**
 * Team repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { Team, TeamFilters, PaginatedResult } from '@/types/domain';

const MOCK_TEAMS: Team[] = [
  {
    id: 1,
    slug: 'tokyo-ballers-1',
    name: 'Tokyo Ballers',
    location: '東京都',
    imageUrl: null,
    xAccount: null,
    instagramAccount: null,
    tiktokAccount: null,
    updatedAt: '2025-04-01T00:00:00Z',
  },
  {
    id: 2,
    slug: 'osaka-kings-2',
    name: 'Osaka Kings',
    location: '大阪府',
    imageUrl: null,
    xAccount: null,
    instagramAccount: null,
    tiktokAccount: null,
    updatedAt: '2025-04-01T00:00:00Z',
  },
  {
    id: 3,
    slug: 'nagoya-hoopers-3',
    name: 'Nagoya Hoopers',
    location: '愛知県',
    imageUrl: null,
    xAccount: null,
    instagramAccount: null,
    tiktokAccount: null,
    updatedAt: '2025-04-01T00:00:00Z',
  },
  {
    id: 4,
    slug: 'fukuoka-streetballers-4',
    name: 'Fukuoka Streetballers',
    location: '福岡県',
    imageUrl: null,
    xAccount: null,
    instagramAccount: null,
    tiktokAccount: null,
    updatedAt: '2025-04-01T00:00:00Z',
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
