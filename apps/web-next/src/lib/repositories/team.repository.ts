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
    category: '一般クラブ',
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
    category: '一般クラブ',
    imageUrl: null,
    websiteUrl: 'https://flowlish-gunma.com/',
    xAccount: 'flowlish3x3',
    instagramAccount: 'flowlish3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },

  // ⭐追加
  {
    id: 3,
    slug: 'brisbane-3x3-exe-3',
    name: 'BRISBANE 3X3.EXE',
    location: 'Australia',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: null,
    xAccount: null,
    instagramAccount: 'brisbane3x3exe',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 4,
    slug: 'melbourne-magic-exe-4',
    name: 'MELBOURNE MAGIC.EXE',
    location: 'Australia',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: null,
    xAccount: null,
    instagramAccount: 'melbournemagic3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 5,
    slug: 'zethree-ishikawa-exe-5',
    name: 'ZETHREE ISHIKAWA.EXE',
    location: '石川県',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: null,
    xAccount: null,
    instagramAccount: 'zethree3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 6,
    slug: 'utsunomiya-brex-exe-6',
    name: 'UTSUNOMIYA BREX.EXE',
    location: '栃木県',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: 'https://www.utsunomiyabrex.com/',
    xAccount: 'brex3x3',
    instagramAccount: null,
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 7,
    slug: 'hachinohe-dime-exe-7',
    name: 'HACHINOHE DIME.EXE',
    location: '青森県',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: 'https://www.dime-3x3.com/',
    xAccount: 'hachinohe_dime',
    instagramAccount: 'hachinohe_dime',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 8,
    slug: 'minakami-town-exe-8',
    name: 'MINAKAMI TOWN.EXE',
    location: '群馬県',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: null,
    xAccount: null,
    instagramAccount: 'minakami3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 9,
    slug: 'rn-sport-exe-9',
    name: 'RN SPORT.EXE',
    location: 'Japan',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: null,
    xAccount: null,
    instagramAccount: null,
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 10,
    slug: 'shonan-seaside-exe-10',
    name: 'SHONAN SEASIDE.EXE',
    location: '神奈川県',
    category: 'EXE',
    imageUrl: null,
    websiteUrl: null,
    xAccount: null,
    instagramAccount: 'shonanseaside3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 11,
    slug: 'singapore-exe-11',
    name: 'SINGAPORE',
    location: 'Singapore',
    category: '代表',
    imageUrl: null,
    websiteUrl: null,
    xAccount: 'sgbasketball',
    instagramAccount: 'sgbasketball',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 12,
    slug: 'singapore-u23-exe-12',
    name: 'SINGAPORE U-23',
    location: 'Singapore',
    category: 'U23',
    imageUrl: null,
    websiteUrl: null,
    xAccount: null,
    instagramAccount: null,
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 13,
    slug: 'lugano-exe-13',
    name: 'LUGANO',
    location: 'Switzerland',
    category: '招待',
    imageUrl: null,
    websiteUrl: null,
    xAccount: '3x3lugano',
    instagramAccount: '3x3lugano',
    tiktokAccount: null,
    updatedAt: '2026-02-26T00:00:00Z',
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

  if (filters.category) {
    result = result.filter((t) => t.category === filters.category);
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

export async function getTeamsByIds(ids: number[]): Promise<Team[]> {
  if (ids.length === 0) return [];
  // 元の ids の順序を保持して返す
  return ids
    .map((id) => MOCK_TEAMS.find((t) => t.id === id))
    .filter((t): t is Team => t !== undefined);
}
