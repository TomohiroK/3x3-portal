/**
 * Teams list page — Server Component with ISR.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { TeamCard } from '@/components/ui/TeamCard';
import { TeamFilters } from '@/components/ui/TeamFilters';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { listTeams } from '@/lib/repositories/team.repository';
import { parseSearchParam, parsePageParam } from '@/lib/utils/params';
import type { TeamCategory } from '@/types/domain';

export const revalidate = 43200; // 12 h

export const metadata: Metadata = {
  title: '3x3バスケ チーム一覧',
  description: '3x3バスケットボールのチームを一覧で掲載。国内外の主要チームのSNS・公式サイトリンクを収録。ニュースやイベントで取り上げたチームを随時更新。',
};

const VALID_CATEGORIES = new Set<TeamCategory>(['EXE', '代表', 'U23', '招待', '一般クラブ']);

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function TeamsPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const rawCategory = typeof sp.category === 'string' ? sp.category : '';
  const category: TeamCategory | '' = VALID_CATEGORIES.has(rawCategory as TeamCategory)
    ? (rawCategory as TeamCategory)
    : '';

  const filters = {
    search: parseSearchParam(typeof sp.search === 'string' ? sp.search : null),
    category,
    page: parsePageParam(typeof sp.page === 'string' ? sp.page : null),
    pageSize: 24,
  };

  let result: Awaited<ReturnType<typeof listTeams>> | null = null;
  let fetchError: string | null = null;

  try {
    result = await listTeams(filters);
  } catch {
    fetchError = 'チーム情報の取得に失敗しました。時間をおいて再度お試しください。';
  }

  const totalPages = result ? Math.ceil(result.total / filters.pageSize) : 0;

  return (
    <div className="portal-container py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">チーム</h1>
        <p className="text-sm text-gray-400">
          ニュースやイベントなどで取り上げたチームを掲載しています。
        </p>
      </div>

      <TeamFilters currentSearch={filters.search} currentCategory={filters.category} />

      {/* Results */}
      {fetchError ? (
        <ErrorMessage message={fetchError} />
      ) : result && result.items.length === 0 ? (
        <EmptyState
          title="チームが見つかりませんでした"
          description="検索条件を変えてお試しください。"
        />
      ) : result ? (
        <>
          <p className="text-sm text-gray-400">{result.total} チーム</p>

          <ul className="grid gap-3 sm:grid-cols-2" role="list">
            {result.items.map((team) => (
              <li key={team.id}>
                <TeamCard team={team} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav aria-label="ページナビゲーション" className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={{
                    pathname: '/teams',
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
