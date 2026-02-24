/**
 * Venue repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { Venue, VenueFilters, PaginatedResult } from '@/types/domain';

const MOCK_VENUES: Venue[] = [
  {
    id: 1,
    slug: 'shibuya-sports-park-1',
    name: '渋谷スポーツパーク',
    region: '東京都',
    mapUrl: 'https://maps.google.com/?q=渋谷スポーツパーク+東京都',
    updatedAt: '2026-02-23T09:00:00Z',
  },
  {
    id: 2,
    slug: 'osaka-namba-court-2',
    name: 'なんばコート',
    region: '大阪府',
    mapUrl: 'https://maps.google.com/?q=なんばコート+大阪府',
    updatedAt: '2025-11-10T00:00:00Z',
  },
  {
    id: 3,
    slug: 'nagoya-outdoor-court-3',
    name: '名古屋アウトドアコート',
    region: '愛知県',
    mapUrl: 'https://maps.google.com/?q=名古屋アウトドアコート+愛知県',
    updatedAt: '2025-09-05T00:00:00Z',
  },
  {
    id: 4,
    slug: 'sapporo-odori-plaza-4',
    name: '大通プラザ',
    region: '北海道',
    mapUrl: 'https://maps.google.com/?q=大通プラザ+北海道',
    updatedAt: '2025-08-20T00:00:00Z',
  },
  {
    id: 5,
    slug: 'fukuoka-marine-messe-5',
    name: 'マリンメッセ福岡',
    region: '福岡県',
    mapUrl: 'https://maps.google.com/?q=マリンメッセ福岡',
    updatedAt: '2025-07-15T00:00:00Z',
  },
];

export async function listVenues(filters: VenueFilters): Promise<PaginatedResult<Venue>> {
  let result = MOCK_VENUES;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (v) => v.name.toLowerCase().includes(q) || v.region.toLowerCase().includes(q)
    );
  }

  const total = result.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = result.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}
