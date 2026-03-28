/**
 * Event repository — reads from JSON data file.
 * Scheduled task updates src/data/events/events.json.
 */
import type { PortalEvent, EventFilters, PaginatedResult } from '@/types/domain';
import eventsData from '@/data/events/events.json';

const events: PortalEvent[] = eventsData as PortalEvent[];

function applyFilters(allEvents: PortalEvent[], filters: EventFilters): PortalEvent[] {
  let result = allEvents;

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
  const filtered = applyFilters(events, filters);
  const total = filtered.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = filtered.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}

export async function getUpcomingEvents(limit = 5): Promise<PortalEvent[]> {
  const today = new Date().toISOString().slice(0, 10);
  return events.filter((e) => e.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, limit);
}

export async function getEventById(id: number): Promise<PortalEvent | null> {
  return events.find((e) => e.id === id) ?? null;
}
