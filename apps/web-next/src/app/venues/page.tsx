/**
 * Venues list page — Server Component with ISR.
 * Detail page not provided; Google Maps link opens externally.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, MapPin, Globe, Clock } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { NewBadge } from '@/components/ui/NewBadge';
import { listVenues } from '@/lib/repositories/venue.repository';
import { formatDateShort, isNewlyUpdated } from '@/lib/utils/date';
import { parseSearchParam, parsePageParam } from '@/lib/utils/params';

export const revalidate = 60;

export const metadata: Metadata = {
  title: '会場',
  description: '3x3バスケットボールの会場情報',
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function VenuesPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const filters = {
    search: parseSearchParam(typeof sp.search === 'string' ? sp.search : null),
    page: parsePageParam(typeof sp.page === 'string' ? sp.page : null),
    pageSize: 24,
  };

  let result: Awaited<ReturnType<typeof listVenues>> | null = null;
  let fetchError: string | null = null;

  try {
    result = await listVenues(filters);
  } catch {
    fetchError = '会場情報の取得に失敗しました。時間をおいて再度お試しください。';
  }

  const totalPages = result ? Math.ceil(result.total / filters.pageSize) : 0;

  return (
    <div className="portal-container py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">会場</h1>
        <p className="text-sm text-gray-400">
          ニュースやイベントなどで取り上げた会場を掲載しています。
        </p>
      </div>

      {/* Search form */}
      <form method="get" className="flex gap-3" aria-label="会場検索">
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
            placeholder="会場名・都道府県で検索"
            maxLength={100}
            className="w-full rounded-lg border border-brand-muted bg-brand-surface py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-orange focus:outline-none"
            aria-label="会場検索"
          />
        </div>
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
          title="会場が見つかりませんでした"
          description="検索条件を変えてお試しください。"
        />
      ) : result ? (
        <>
          <p className="text-sm text-gray-400">{result.total} 会場</p>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {result.items.map((venue) => {
              const isNew = isNewlyUpdated(venue.updatedAt);
              return (
                <li key={venue.id}>
                  <div className="card p-4 flex flex-col gap-3">
                    {/* Header */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {isNew && <NewBadge />}
                      <h3 className="font-semibold text-white leading-snug">{venue.name}</h3>
                    </div>

                    {/* Region */}
                    <p className="flex items-center gap-1.5 text-sm text-gray-400">
                      <MapPin size={14} aria-hidden="true" />
                      {venue.region}
                    </p>

                    {/* Footer: website link + updated date */}
                    <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                      {venue.websiteUrl ? (
                        <a
                          href={venue.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 transition-colors"
                          aria-label={`${venue.name} の公式サイトを見る`}
                        >
                          <Globe size={14} aria-hidden="true" />
                          公式サイト
                        </a>
                      ) : (
                        <span />
                      )}
                      <p className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock size={11} aria-hidden="true" />
                        更新: {formatDateShort(venue.updatedAt)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <nav aria-label="ページナビゲーション" className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={{
                    pathname: '/venues',
                    query: {
                      ...(filters.search && { search: filters.search }),
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
