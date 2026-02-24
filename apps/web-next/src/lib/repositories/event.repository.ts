/**
 * Event repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { PortalEvent, EventFilters, PaginatedResult } from '@/types/domain';

const MOCK_EVENTS: PortalEvent[] = [
  {
    id: 1,
    slug: 'tokyo-3x3-open-2025-1',
    name: 'Tokyo 3x3 Open 2025',
    description: '東京で開催される3x3バスケットボールの公式大会です。',
    location: '東京都渋谷区',
    startDate: '2025-06-15',
    endDate: '2025-06-16',
    status: 'upcoming',
    imageUrl: null,
    updatedAt: '2025-04-01T00:00:00Z',
  },
  {
    id: 2,
    slug: 'osaka-street-ball-2025-2',
    name: 'Osaka Street Ball 2025',
    description: '大阪で開催されるストリートバスケットボール大会。',
    location: '大阪府大阪市',
    startDate: '2025-07-20',
    endDate: '2025-07-21',
    status: 'upcoming',
    imageUrl: null,
    updatedAt: '2025-04-01T00:00:00Z',
  },
  {
    id: 3,
    slug: 'nagoya-3x3-cup-2025-3',
    name: 'Nagoya 3x3 Cup 2025',
    description: '名古屋の屋外コートで行われるトーナメント大会。',
    location: '愛知県名古屋市',
    startDate: '2025-05-10',
    endDate: '2025-05-10',
    status: 'completed',
    imageUrl: null,
    updatedAt: '2025-05-11T00:00:00Z',
  },
  {
    id: 4,
    slug: 'sapporo-3x3-festival-2025-4',
    name: 'Sapporo 3x3 Festival 2025',
    description: '北海道初の大規模3x3フェスティバル。',
    location: '北海道札幌市',
    startDate: '2025-08-03',
    endDate: '2025-08-04',
    status: 'upcoming',
    imageUrl: null,
    updatedAt: '2025-04-15T00:00:00Z',
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
        (e.description ?? '').toLowerCase().includes(q)
    );
  }

  if (filters.status) {
    result = result.filter((e) => e.status === filters.status);
  }

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
