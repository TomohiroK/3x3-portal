/**
 * GET /api/teams
 * Query params: search, page, pageSize
 *
 * Dynamic route (uses searchParams); CDN caching via Cache-Control header.
 */
import { type NextRequest, NextResponse } from 'next/server';
import { listTeams } from '@/lib/repositories/team.repository';
import {
  parseSearchParam,
  parsePageParam,
  parsePageSizeParam,
} from '@/lib/utils/params';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;

    const filters = {
      search: parseSearchParam(sp.get('search')),
      category: '' as const,
      page: parsePageParam(sp.get('page')),
      pageSize: parsePageSizeParam(sp.get('pageSize'), 20, 100),
    };

    const result = await listTeams(filters);

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=3600' },
    });
  } catch (err) {
    console.error('[/api/teams] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}
