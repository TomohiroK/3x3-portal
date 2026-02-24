/**
 * Events list page — Server Component with ISR.
 * Search and status filter via URL search params (no client JS required for initial render).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { EventCard } from '@/components/ui/EventCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { listEvents } from '@/lib/repositories/event.repository';
import { parseSearchParam, parsePageParam } from '@/lib/utils/params';
import type { EventStatus } from '@/types/domain';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'イベント',
  description: '3x3バスケットボールのイベント一覧',
};

const VALID_STATUSES = new Set<EventStatus>(['upcoming', 'ongoing', 'completed', 'cancelled']);
const STATUS_OPTIONS: { value: EventStatus | ''; label: string }[] = [
  { value: '', label: 'すべて' },
  { value: 'upcoming', label: '開催予定' },
  { value: 'ongoing', label: '開催中' },
  { value: 'completed', label: '終了' },
];

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
      <h1 className="text-2xl font-bold text-white">イベント</h1>

      {/* Filters — native HTML form, works without JS */}
      <form method="get" className="flex flex-col sm:flex-row gap-3" aria-label="イベント絞り込み">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            name="search"
            defaultValue={filters.search}
            placeholder="イベント名・会場で検索"
            maxLength={100}
            className="w-full rounded-lg border border-brand-muted bg-brand-surface py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-orange focus:outline-none"
            aria-label="イベント検索"
          />
        </div>

        <select
          name="status"
          defaultValue={filters.status}
          className="rounded-lg border border-brand-muted bg-brand-surface py-2 px-3 text-sm text-white focus:border-brand-orange focus:outline-none"
          aria-label="ステータスで絞り込み"
        >
          {STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange/80 focus-visible:outline transition-colors"
        >
          検索
        </button>
      </form>

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
