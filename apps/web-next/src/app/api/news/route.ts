/**
 * GET /api/news
 * Query params: search, teamId, page, pageSize
 *
 * Dynamic route (uses searchParams); CDN caching via Cache-Control header.
 */
import { type NextRequest, NextResponse } from 'next/server';
import { listNews } from '@/lib/repositories/news.repository';
import {
  parseSearchParam,
  parsePageParam,
  parsePageSizeParam,
  parseOptionalIntParam,
} from '@/lib/utils/params';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;

    const filters = {
      search: parseSearchParam(sp.get('search')),
      teamId: parseOptionalIntParam(sp.get('teamId')),
      page: parsePageParam(sp.get('page')),
      pageSize: parsePageSizeParam(sp.get('pageSize'), 20, 100),
    };

    const result = await listNews(filters);

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=3600' },
    });
  } catch (err) {
    console.error('[/api/news] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
