/**
 * Venue repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { Venue, VenueFilters, PaginatedResult } from '@/types/domain';

const MOCK_VENUES: Venue[] = [
  {
    id: 1,
    slug: 'xebio-arena-sendai',
    name: 'ゼビオアリーナ仙台',
    region: '宮城県仙台市',
    websiteUrl: 'https://www.xebioarena.com/',
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 2,
    slug: 'mega-bangna',
    name: 'Mega Bangna',
    region: 'Samut Prakan, Thailand',
    websiteUrl: 'https://www.mega-bangna.com/',
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 3,
    slug: 'sengkang-grand-mall',
    name: 'Sengkang Grand Mall',
    region: 'Singapore',
    websiteUrl: 'https://www.sengkanggrandmall.com.sg/en.html',
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 4,
    slug: 'the-kallang-singapore-sports-hub',
    name: 'The Kallang (Singapore Sports Hub)',
    region: 'Singapore',
    websiteUrl: 'https://www.thekallang.com.sg/',
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 5,
    slug: 'utsunomiya-city-center',
    name: '宇都宮中心市街地特設コート',
    region: '栃木県宇都宮市',
    websiteUrl: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 6,
    slug: 'chengdu-city-center',
    name: '成都中心市街地特設コート',
    region: 'Chengdu, China',
    websiteUrl: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 7,
    slug: 'zadar-old-town-court',
    name: 'Zadar Old Town Court',
    region: 'Zadar, Croatia',
    websiteUrl: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 8,
    slug: 'shanghai-city-center',
    name: '上海中心市街地特設コート',
    region: 'Shanghai, China',
    websiteUrl: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
];

/**
 * イベントの location 文字列（会場名＋住所混在）から一致する会場を返す。
 * 会場名が location に含まれているかで判定する。
 */
export function findVenueByLocation(location: string): Venue | null {
  return MOCK_VENUES.find((v) => location.includes(v.name)) ?? null;
}

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
