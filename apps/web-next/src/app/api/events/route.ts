/**
 * GET /api/events
 * Query params: search, status, page, pageSize
 *
 * Dynamic route (uses searchParams); CDN caching via Cache-Control header.
 */
import { type NextRequest, NextResponse } from 'next/server';
import { listEvents } from '@/lib/repositories/event.repository';
import {
  parseSearchParam,
  parsePageParam,
  parsePageSizeParam,
} from '@/lib/utils/params';
import type { EventStatus } from '@/types/domain';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = new Set<EventStatus>(['upcoming', 'ongoing', 'completed', 'cancelled']);

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;

    const rawStatus = sp.get('status') ?? '';
    const status: EventStatus | '' = VALID_STATUSES.has(rawStatus as EventStatus)
      ? (rawStatus as EventStatus)
      : '';

    const filters = {
      search: parseSearchParam(sp.get('search')),
      status,
      page: parsePageParam(sp.get('page')),
      pageSize: parsePageSizeParam(sp.get('pageSize'), 20, 100),
    };

    const result = await listEvents(filters);

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=3600' },
    });
  } catch (err) {
    console.error('[/api/events] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
