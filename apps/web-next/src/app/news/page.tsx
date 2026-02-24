/**
 * News list page — Server Component with ISR.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { NewsCard } from '@/components/ui/NewsCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { listNews } from '@/lib/repositories/news.repository';
import { parseSearchParam, parsePageParam, parseOptionalIntParam } from '@/lib/utils/params';

export const revalidate = 43200; // 12 h

export const metadata: Metadata = {
  title: '3x3バスケ 最新ニュース',
  description: '3x3バスケットボールに関する最新ニュースを一覧で確認。大会情報・チーム動向・試合結果など随時更新中。',
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const filters = {
    search: parseSearchParam(typeof sp.search === 'string' ? sp.search : null),
    teamId: parseOptionalIntParam(typeof sp.teamId === 'string' ? sp.teamId : null),
    page: parsePageParam(typeof sp.page === 'string' ? sp.page : null),
    pageSize: 20,
  };

  let result: Awaited<ReturnType<typeof listNews>> | null = null;
  let fetchError: string | null = null;

  try {
    result = await listNews(filters);
  } catch {
    fetchError = 'ニュースの取得に失敗しました。時間をおいて再度お試しください。';
  }

  const totalPages = result ? Math.ceil(result.total / filters.pageSize) : 0;

  return (
    <div className="portal-container py-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">ニュース</h1>

      <form method="get" className="flex gap-3" aria-label="ニュース検索">
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
            placeholder="ニュースを検索"
            maxLength={100}
            className="w-full rounded-lg border border-brand-muted bg-brand-surface py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-orange focus:outline-none"
            aria-label="ニュース検索"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange/80 focus-visible:outline transition-colors"
        >
          検索
        </button>
      </form>

      {fetchError ? (
        <ErrorMessage message={fetchError} />
      ) : result && result.items.length === 0 ? (
        <EmptyState
          title="ニュースが見つかりませんでした"
          description="検索条件を変えてお試しください。"
        />
      ) : result ? (
        <>
          <ul className="flex flex-col gap-3" role="list">
            {result.items.map((article) => (
              <li key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav aria-label="ページナビゲーション" className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={{
                    pathname: '/news',
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
