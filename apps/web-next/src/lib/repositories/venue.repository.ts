/**
 * Venue repository — reads from JSON data file.
 * Scheduled task updates src/data/venues/venues.json.
 */
import type { Venue, VenueFilters, PaginatedResult } from '@/types/domain';
import venuesData from '@/data/venues/venues.json';

const venues: Venue[] = venuesData as Venue[];

/**
 * イベントの location 文字列（会場名＋住所混在）から一致する会場を返す。
 * 会場名が location に含まれているかで判定する。
 */
export function findVenueByLocation(location: string): Venue | null {
  return venues.find((v) => location.includes(v.name)) ?? null;
}

export async function listVenues(filters: VenueFilters): Promise<PaginatedResult<Venue>> {
  let result = venues;

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
