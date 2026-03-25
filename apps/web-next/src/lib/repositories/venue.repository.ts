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

  // ⭐追加（既存）
  {
    id: 9,
    slug: 'hengqin-island',
    name: 'Hengqin Island Court',
    region: 'Zhuhai, China',
    websiteUrl: null,
    updatedAt: '2026-02-26T00:00:00Z',
  },
  {
    id: 10,
    slug: 'ebisu-garden-place-center-plaza',
    name: '恵比寿ガーデンプレイス センター広場',
    region: '東京都渋谷区',
    websiteUrl: 'https://gardenplace.jp/',
    updatedAt: '2026-02-26T00:00:00Z',
  },

  // ✅ 追加（今回増えたイベントの会場）
  {
    id: 11,
    slug: 'light-cube-utsunomiya',
    name: 'ライトキューブ宇都宮',
    region: '栃木県宇都宮市',
    websiteUrl: 'https://light-cube.jp/',
    updatedAt: '2026-03-03T00:00:00Z',
  },
  {
    id: 12,
    slug: 'waterras',
    name: 'ワテラス（WATERRAS）',
    region: '東京都千代田区',
    websiteUrl: 'https://www.waterras.com/',
    updatedAt: '2026-03-03T00:00:00Z',
  },
  {
    id: 13,
    slug: 'yaizu-port',
    name: '焼津港（焼津漁港）',
    region: '静岡県焼津市',
    websiteUrl: 'https://www.city.yaizu.lg.jp/business/suisan-nougyo/fisheries/port/yaizu-port.html',
    updatedAt: '2026-03-03T00:00:00Z',
  },
  {
    id: 14,
    slug: 'sevenpark-ario-kashiwa',
    name: 'セブンパーク アリオ柏',
    region: '千葉県柏市',
    websiteUrl: 'https://sevenpark-kashiwa.ario.jp/',
    updatedAt: '2026-03-03T00:00:00Z',
  },
  {
    id: 15,
    slug: 'campus-square-univadome-kobe',
    name: 'キャンパススクェア（ユニバードーム）',
    region: '兵庫県神戸市',
    websiteUrl: null,
    updatedAt: '2026-03-25T00:00:00Z',
  },
  {
    id: 16,
    slug: 'onda-sports-park-ube',
    name: '恩田スポーツパーク',
    region: '山口県宇部市',
    websiteUrl: null,
    updatedAt: '2026-03-25T00:00:00Z',
  },
  {
    id: 17,
    slug: 'oasis21-nagoya',
    name: 'オアシス21 銀河の広場',
    region: '愛知県名古屋市',
    websiteUrl: 'https://www.sakaepark.co.jp/oasis21/',
    updatedAt: '2026-03-25T00:00:00Z',
  },
  {
    id: 18,
    slug: 'arctown-utsunomiya',
    name: 'アークタウン宇都宮',
    region: '栃木県宇都宮市',
    websiteUrl: null,
    updatedAt: '2026-03-25T00:00:00Z',
  },
  {
    id: 19,
    slug: 'grangreen-osaka',
    name: 'グラングリーン大阪 ロートハートスクエアうめきた',
    region: '大阪府大阪市',
    websiteUrl: 'https://www.grangreen-osaka.com/',
    updatedAt: '2026-03-25T00:00:00Z',
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
