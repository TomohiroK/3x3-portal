/**
 * Event repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { PortalEvent, EventFilters, PaginatedResult } from '@/types/domain';

const MOCK_EVENTS: PortalEvent[] = [
  {
    id: 1,
    slug: '3x3-exe-super-premier-sendai-2026-r1',
    name: '3x3.EXE SUPER PREMIER 2025-26 ROUND.1（Sendai）',
    description: '3x3.EXE SUPER PREMIERのラウンド1（仙台開催）。',
    location: 'ゼビオアリーナ仙台（宮城県仙台市太白区あすと長町1-4-10）',
    country: '日本',
    startDate: '2026-02-28',
    endDate: '2026-03-01',
    status: 'upcoming',
    imageUrl: null,
    websiteUrl: 'https://3x3exe.com/superpremier/schedules/',
    xAccount: '3x3league',
    instagramAccount: '3x3.exe',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 2,
    slug: '3x3-exe-super-premier-thailand-2026-r2-mega-bangna',
    name: '3x3.EXE SUPER PREMIER 2025-26 ROUND.2（Thailand / Mega Bangna）',
    description: '3x3.EXE SUPER PREMIERのラウンド2（タイ開催）。',
    location: 'Mega Bangna - Food Walk Plaza（38-38/1-3, 39 Bang Na-Trat Frontage Rd, Bang Kaeo, Bang Phli District, Samut Prakan 10540, Thailand）',
    country: 'タイ',
    startDate: '2026-03-21',
    endDate: '2026-03-22',
    status: 'upcoming',
    imageUrl: null,
    websiteUrl: 'https://3x3exe.com/superpremier/schedules/',
    xAccount: '3x3league',
    instagramAccount: '3x3.exe',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 3,
    slug: '3x3-exe-super-premier-singapore-2026-final-sengkang-grand-mall',
    name: '3x3.EXE SUPER PREMIER 2025-26 FINAL（Singapore / Sengkang Grand Mall）',
    description: '3x3.EXE SUPER PREMIERのファイナルラウンド（シンガポール開催）。',
    location: 'Sengkang Grand Mall（70 Compassvale Bow, Singapore 544692）',
    country: 'シンガポール',
    startDate: '2026-03-28',
    endDate: '2026-03-29',
    status: 'upcoming',
    imageUrl: null,
    websiteUrl: 'https://3x3exe.com/superpremier/schedules/',
    xAccount: '3x3league',
    instagramAccount: '3x3.exe',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 4,
    slug: 'fiba-3x3-asia-cup-2026-singapore-ocbc-square',
    name: 'FIBA 3x3 Asia Cup 2026',
    description: 'アジア各国・地域の代表が集結するFIBA公式3x3国際大会（アジアカップ）。',
    location: 'OCBC Square（1 Stadium Drive, Singapore 397629）',
    country: 'シンガポール',
    startDate: '2026-04-01',
    endDate: '2026-04-05',
    status: 'upcoming',
    imageUrl: 'https://www.thekallang.com.sg/sites/default/files/2026-02/Event-Hero-Banner-1200x675.png',
    websiteUrl: 'https://www.thekallang.com.sg/events/fiba-3x3-asia-cup-26',
    xAccount: 'FIBA3x3',
    instagramAccount: 'fiba3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 5,
    slug: 'fiba-3x3-world-tour-utsunomiya-opener-2026',
    name: 'FIBA 3x3 World Tour Utsunomiya Opener 2026',
    description: 'FIBA 3x3 World Tour 2026シーズン開幕戦（宇都宮）。',
    location: '栃木県 宇都宮市',
    country: '日本',
    startDate: '2026-04-25',
    endDate: '2026-04-26',
    status: 'upcoming',
    imageUrl: null,
    websiteUrl: 'https://about.fiba.basketball/en/news/fiba-3x3-world-tour-reveals-global-line-up-of-host-cities-for-upcoming',
    xAccount: 'FIBA3x3',
    instagramAccount: 'fiba3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 6,
    slug: 'fiba-3x3-world-tour-chengdu-2026',
    name: 'FIBA 3x3 World Tour Chengdu 2026',
    description: 'FIBA 3x3 World Tour 2026のツアーストップ（成都）。',
    location: '中国 成都（Chengdu, China）',
    country: '中国',
    startDate: '2026-05-02',
    endDate: '2026-05-03',
    status: 'upcoming',
    imageUrl: null,
    websiteUrl: 'https://about.fiba.basketball/en/news/fiba-3x3-world-tour-reveals-global-line-up-of-host-cities-for-upcoming',
    xAccount: 'FIBA3x3',
    instagramAccount: 'fiba3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 7,
    slug: 'fiba-3x3-world-tour-zadar-2026',
    name: 'FIBA 3x3 World Tour Zadar 2026',
    description: 'FIBA 3x3 World Tour 2026のツアーストップ（ザダル）。',
    location: 'クロアチア ザダル（Zadar, Croatia）',
    country: 'クロアチア',
    startDate: '2026-05-15',
    endDate: '2026-05-16',
    status: 'upcoming',
    imageUrl: null,
    websiteUrl: 'https://about.fiba.basketball/en/news/fiba-3x3-world-tour-reveals-global-line-up-of-host-cities-for-upcoming',
    xAccount: 'FIBA3x3',
    instagramAccount: 'fiba3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
  {
    id: 8,
    slug: 'fiba-3x3-world-tour-shanghai-2026',
    name: 'FIBA 3x3 World Tour Shanghai 2026',
    description: 'FIBA 3x3 World Tour 2026のツアーストップ（上海）。',
    location: '中国 上海（Shanghai, China）',
    country: '中国',
    startDate: '2026-05-23',
    endDate: '2026-05-24',
    status: 'upcoming',
    imageUrl: null,
    websiteUrl: 'https://about.fiba.basketball/en/news/fiba-3x3-world-tour-reveals-global-line-up-of-host-cities-for-upcoming',
    xAccount: 'FIBA3x3',
    instagramAccount: 'fiba3x3',
    tiktokAccount: null,
    updatedAt: '2026-02-24T00:00:00Z',
  },
];

function applyFilters(events: PortalEvent[], filters: EventFilters): PortalEvent[] {
  let result = events;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.country.toLowerCase().includes(q) ||
        (e.description ?? '').toLowerCase().includes(q)
    );
  }

  if (filters.status) {
    result = result.filter((e) => e.status === filters.status);
  }

  // 開催開始日の早い順に並べる
  result = [...result].sort((a, b) => a.startDate.localeCompare(b.startDate));

  return result;
}

export async function listEvents(filters: EventFilters): Promise<PaginatedResult<PortalEvent>> {
  const filtered = applyFilters(MOCK_EVENTS, filters);
  const total = filtered.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = filtered.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}

export async function getUpcomingEvents(limit = 5): Promise<PortalEvent[]> {
  const today = new Date().toISOString().slice(0, 10);
  return MOCK_EVENTS.filter((e) => e.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, limit);
}

export async function getEventById(id: number): Promise<PortalEvent | null> {
  return MOCK_EVENTS.find((e) => e.id === id) ?? null;
}
