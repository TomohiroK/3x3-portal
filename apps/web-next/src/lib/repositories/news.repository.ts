/**
 * News repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { NewsArticle, NewsFilters, PaginatedResult } from '@/types/domain';

const MOCK_NEWS: NewsArticle[] = [
  {
    id: 1,
    slug: '3x3-women-national-team-first-camp-la2028-1',
    title:
      '3×3女子日本代表がロサンゼルスオリンピックに向けて第1次合宿を実施、国内ランキングトップ10を含めた15名が参加',
    summary:
      'JBAが3×3女子日本代表の第1次強化合宿を実施。国内ランキング上位を中心に15名を招集し、アジアカップ2026やLA五輪に向けた強化を本格始動した。',
    sourceUrl: 'https://basket-count.com/article/detail/253060',
    imageUrl: null,
    publishedAt: '2026-02-24',
    updatedAt: '2026-02-26T00:00:00Z',
    relatedTeams: [],
  },
  {
    id: 2,
    slug: 'japan-3x3-championships-2026-final-recap-2',
    title:
      '3×3日本選手権FINAL総括…SHINAGAWA CITYとFLOWLISH GUNMAが初優勝',
    summary:
      '横浜BUNTAIで開催された3×3日本選手権FINALが終了。男子はSHINAGAWA CITY、女子はFLOWLISH GUNMAが初優勝を達成し、国内最高峰大会の新王者が誕生した。',
    sourceUrl:
      'https://basketballking.jp/news/japan/20260225/597777.html',
    imageUrl: null,
    publishedAt: '2026-02-25',
    updatedAt: '2026-02-26T00:00:00Z',
    relatedTeams: [
      { id: 1, name: 'SHINAGAWA CITY 3x3 BASKETBALL CLUB' },
      { id: 2, name: 'FLOWLISH GUNMA' },
    ],
  },

  // ⭐追加（Sendai直前）
  {
    id: 3,
    slug: '3x3-exe-super-premier-2026-round1-sendai-preview-3',
    title:
      '3x3.EXE SUPER PREMIER 2025-26 ROUND.1が今週末仙台で開幕、国内外12チームが集結',
    summary:
      'ゼビオアリーナ仙台で開催される3x3.EXE SUPER PREMIER ROUND.1に、SHINAGAWA CITYやUTSUNOMIYA BREX.EXE、ZETHREE ISHIKAWA.EXEなど国内外12チームが出場予定。新シーズン最初のSTOPに注目が集まる。',
    sourceUrl:
      'https://3x3exe.com/superpremier/xebio_arena_0228-0301/',
    imageUrl: null,
    publishedAt: '2026-02-26',
    updatedAt: '2026-02-26T08:00:00Z',
    relatedTeams: [
      { id: 1, name: 'SHINAGAWA CITY 3x3 BASKETBALL CLUB' },
      { id: 3, name: 'UTSUNOMIYA BREX.EXE' },
      { id: 4, name: 'ZETHREE ISHIKAWA.EXE' },
    ],
  },

  {
    id: 4,
    slug: '3x3-exe-super-premier-roster-announced-sendai-4',
    title:
      '3x3.EXE SUPER PREMIER ROUND.1仙台大会のロスター発表、各チーム4名体制でエントリー',
    summary:
      'ROUND.1仙台大会の出場12チームがロスターを公開。SHINAGAWA CITY、SHONAN SEASIDE.EXE、UTSUNOMIYA BREX.EXEらが4名体制で登録し、初戦に備える。',
    sourceUrl:
      'https://3x3exe.com/superpremier/teams/',
    imageUrl: null,
    publishedAt: '2026-02-26',
    updatedAt: '2026-02-26T08:00:00Z',
    relatedTeams: [
      { id: 1, name: 'SHINAGAWA CITY 3x3 BASKETBALL CLUB' },
      { id: 3, name: 'UTSUNOMIYA BREX.EXE' },
      { id: 5, name: 'SHONAN SEASIDE.EXE' },
    ],
  },
];

export async function listNews(filters: NewsFilters): Promise<PaginatedResult<NewsArticle>> {
  let result = MOCK_NEWS;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (n) => n.title.toLowerCase().includes(q) || (n.summary ?? '').toLowerCase().includes(q)
    );
  }

  if (filters.teamId !== null) {
    result = result.filter((n) => n.relatedTeams.some((t) => t.id === filters.teamId));
  }

  // 公開日の新しい順に並べる
  result = [...result].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const total = result.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = result.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}

export async function getLatestNews(limit = 4): Promise<NewsArticle[]> {
  return [...MOCK_NEWS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
