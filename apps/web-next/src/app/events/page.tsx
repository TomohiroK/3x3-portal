/**
 * Events list page — Server Component with ISR.
 * Search and status filter via URL search params (no client JS required for initial render).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { EventCard } from '@/components/ui/EventCard';
import { EventFilters } from '@/components/ui/EventFilters';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { listEvents } from '@/lib/repositories/event.repository';
import { parseSearchParam, parsePageParam } from '@/lib/utils/params';
import type { EventStatus } from '@/types/domain';

export const revalidate = 43200; // 12 h

export const metadata: Metadata = {
  title: 'イベント・大会スケジュール',
  description: '国内・海外の3x3バスケットボール大会・イベントのスケジュール一覧。開催予定・進行中・終了で絞り込み可能。随時更新中。',
};

const VALID_STATUSES = new Set<EventStatus>(['upcoming', 'ongoing', 'completed', 'cancelled']);

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function EventsPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const rawStatus = typeof sp.status === 'string' ? sp.status : '';
  const status: EventStatus | '' = VALID_STATUSES.has(rawStatus as EventStatus)
    ? (rawStatus as EventStatus)
    : '';

  const filters = {
    search: parseSearchParam(typeof sp.search === 'string' ? sp.search : null),
    status,
    page: parsePageParam(typeof sp.page === 'string' ? sp.page : null),
    pageSize: 18,
  };

  let result: Awaited<ReturnType<typeof listEvents>> | null = null;
  let fetchError: string | null = null;

  try {
    result = await listEvents(filters);
  } catch {
    fetchError = 'イベント情報の取得に失敗しました。時間をおいて再度お試しください。';
  }

  const totalPages = result ? Math.ceil(result.total / filters.pageSize) : 0;

  return (
    <div className="portal-container py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">イベント</h1>
        <p className="text-sm text-gray-400">
          3x3は参加チームの決定・変更が直前になる場合があります。現時点で未定の情報が数日前に一気に更新されることもありますので、あらかじめご了承ください。
        </p>
      </div>

      <EventFilters currentSearch={filters.search} currentStatus={filters.status} />

      {/* Results */}
      {fetchError ? (
        <ErrorMessage message={fetchError} />
      ) : result && result.items.length === 0 ? (
        <EmptyState
          title="イベントが見つかりませんでした"
          description="検索条件を変えてお試しください。"
        />
      ) : result ? (
        <>
          <p className="text-sm text-gray-400">
            {result.total} 件中 {(filters.page - 1) * filters.pageSize + 1}–
            {Math.min(filters.page * filters.pageSize, result.total)} 件を表示
          </p>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {result.items.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="ページナビゲーション" className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={{
                    pathname: '/events',
                    query: {
                      ...(filters.search && { search: filters.search }),
                      ...(filters.status && { status: filters.status }),
                      page: String(page),
                    },
                  }}
                  className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    page === filters.page
                      ? 'bg-brand-orange text-white'
                      : 'bg-brand-muted text-gray-300 hover:bg-brand-orange/30'
                  }`}
                  aria-current={page === filters.page ? 'page' : undefined}
                >
                  {page}
                </Link>
              ))}
            </nav>
          )}
        </>
      ) : null}
    </div>
  );
}
