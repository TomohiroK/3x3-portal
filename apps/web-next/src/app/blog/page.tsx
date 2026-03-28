/**
 * Blog list page — Server Component with ISR.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { BlogCard } from '@/components/ui/BlogCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { listBlogPosts, getAllBlogCategories } from '@/lib/repositories/blog.repository';
import { parseSearchParam, parsePageParam } from '@/lib/utils/params';
import type { BlogCategory, BlogFilters } from '@/types/domain';

export const revalidate = 43200; // 12 h

export const metadata: Metadata = {
  title: '3x3ブログ — 戦術解説・ルール紹介',
  description:
    '3x3バスケットボールの戦術解説やルール紹介を発信するブログ。ピック&ロール、ディフェンス戦略など、観戦がもっと楽しくなる知識をお届けします。',
  alternates: { canonical: '/blog' },
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const categories = getAllBlogCategories();
  const rawCategory = typeof sp.category === 'string' ? sp.category : '';
  const category = categories.includes(rawCategory as BlogCategory)
    ? (rawCategory as BlogCategory)
    : '';

  const filters: BlogFilters = {
    search: parseSearchParam(typeof sp.search === 'string' ? sp.search : null),
    category,
    page: parsePageParam(typeof sp.page === 'string' ? sp.page : null),
    pageSize: 12,
  };

  let result: Awaited<ReturnType<typeof listBlogPosts>> | null = null;
  let fetchError: string | null = null;

  try {
    result = await listBlogPosts(filters);
  } catch {
    fetchError = 'ブログ記事の取得に失敗しました。時間をおいて再度お試しください。';
  }

  const totalPages = result ? Math.ceil(result.total / filters.pageSize) : 0;

  return (
    <div className="portal-container py-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">ブログ</h1>
      <p className="text-sm text-gray-400">
        3x3バスケットボールの戦術解説・ルール紹介
      </p>

      {/* Search & Category filter */}
      <form method="get" className="flex flex-col gap-3 sm:flex-row" aria-label="ブログ検索">
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
            placeholder="ブログを検索"
            maxLength={100}
            className="w-full rounded-lg border border-brand-muted bg-brand-surface py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-orange focus:outline-none"
            aria-label="ブログ検索"
          />
        </div>
        <select
          name="category"
          defaultValue={filters.category}
          className="rounded-lg border border-brand-muted bg-brand-surface py-2 px-3 text-sm text-white focus:border-brand-orange focus:outline-none"
          aria-label="カテゴリ選択"
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange/80 focus-visible:outline transition-colors whitespace-nowrap"
        >
          検索
        </button>
      </form>

      {fetchError ? (
        <ErrorMessage message={fetchError} />
      ) : result && result.items.length === 0 ? (
        <EmptyState
          title="記事が見つかりませんでした"
          description="検索条件を変えてお試しください。"
        />
      ) : result ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {result.items.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="ページナビゲーション" className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={{
                    pathname: '/blog',
                    query: {
                      ...(filters.search && { search: filters.search }),
                      ...(filters.category && { category: filters.category }),
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
