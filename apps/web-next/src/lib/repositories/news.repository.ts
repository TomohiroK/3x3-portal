/**
 * News repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { NewsArticle, NewsFilters, PaginatedResult } from '@/types/domain';

const MOCK_NEWS: NewsArticle[] = [
  {
    id: 1,
    slug: 'tokyo-3x3-open-2025-entrants-announced-1',
    title: 'Tokyo 3x3 Open 2025 出場チーム発表',
    summary: '6月開催のTokyo 3x3 Openに出場する16チームが発表されました。',
    sourceUrl: 'https://example.com/news/tokyo-3x3-open-2025-entrants',
    imageUrl: null,
    publishedAt: '2025-04-10',
    updatedAt: '2026-02-24T09:00:00Z',
    relatedTeamId: null,
    relatedTeamName: null,
  },
  {
    id: 2,
    slug: 'osaka-kings-new-roster-2',
    title: 'Osaka Kings、新シーズンのロスター発表',
    summary: 'Osaka Kingsが2025シーズンの新ロスターを発表しました。',
    sourceUrl: null,
    imageUrl: null,
    publishedAt: '2025-03-28',
    updatedAt: '2025-03-28T00:00:00Z',
    relatedTeamId: 2,
    relatedTeamName: 'Osaka Kings',
  },
  {
    id: 3,
    slug: 'nagoya-3x3-cup-results-3',
    title: 'Nagoya 3x3 Cup 2025 結果速報',
    summary: 'Tokyo Ballersが優勝。決勝では僅差でNagoya Hoopersを下しました。',
    sourceUrl: 'https://example.com/news/nagoya-3x3-cup-2025-results',
    imageUrl: null,
    publishedAt: '2025-05-10',
    updatedAt: '2025-05-10T00:00:00Z',
    relatedTeamId: 1,
    relatedTeamName: 'Tokyo Ballers',
  },
];

export async function listNews(filters: NewsFilters): Promise<PaginatedResult<NewsArticle>> {
  let result = MOCK_NEWS;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (n) => n.title.toLowerCase().includes(q) || (n.summary ?? '').toLowerCase().includes(q)
    );
  }

  if (filters.teamId !== null) {
    result = result.filter((n) => n.relatedTeamId === filters.teamId);
  }

  const total = result.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = result.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}

export async function getLatestNews(limit = 4): Promise<NewsArticle[]> {
  return [...MOCK_NEWS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
