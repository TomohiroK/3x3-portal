/**
 * News repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { NewsArticle, NewsFilters, PaginatedResult } from '@/types/domain';

const MOCK_NEWS: NewsArticle[] = [
  {
    id: 1,
    slug: '3x3-exe-super-premier-2025-26-round1-lugano-wins-1',
    title: '〖ROUND1速報〗LUGANO(スイス)が優勝！',
    summary:
      '3x3.EXE SUPER PREMIER 2025-26 ROUND.1（仙台）が2日間の日程を終了。予選グループ（2/28）と決勝トーナメント（3/1）の結果、LUGANO（スイス）が優勝。次戦ROUND.2（タイ）とFINAL（シンガポール）へ繋がる初戦が決着。',
    sourceUrl: 'https://3x3exe.com/superpremier/round1_result/',
    imageUrl: null,
    publishedAt: '2026-03-01',
    updatedAt: '2026-03-01T00:00:00Z',
    relatedTeams: [{ id: 13, name: 'LUGANO' }],
  },
  {
    id: 2,
    slug: '3x3-exe-super-premier-2025-26-round1-day1-results-day2-slots-2',
    title: '〖ROUND1〗DAY.1結果 & DAY.2スロット',
    summary:
      '仙台ROUND.1のDAY.1（グループ予選）結果と、DAY.2決勝トーナメント進出8チームが公開。GROUP AはBRISBANE 3x3.EXEとSHINAGAWA CITY.EXE、GROUP BはUTSUNOMIYA BREX.EXEとLUGANO、GROUP CはZETHREE ISHIKAWA.EXEとSHONAN SEASIDE.EXE、GROUP DはRN SPORT.EXEとSINGAPOREが通過。',
    sourceUrl: 'https://3x3exe.com/superpremier/round1_results_slots/',
    imageUrl: null,
    publishedAt: '2026-02-28',
    updatedAt: '2026-03-01T00:00:00Z',
    relatedTeams: [
      { id: 3, name: 'BRISBANE 3X3.EXE' },
      { id: 1, name: 'SHINAGAWA CITY 3x3 BASKETBALL CLUB' },
      { id: 6, name: 'UTSUNOMIYA BREX.EXE' },
      { id: 13, name: 'LUGANO' },
      { id: 5, name: 'ZETHREE ISHIKAWA.EXE' },
      { id: 10, name: 'SHONAN SEASIDE.EXE' },
      { id: 9, name: 'RN SPORT.EXE' },
      { id: 11, name: 'SINGAPORE' },
    ],
  },
  {
    id: 3,
    slug: '3x3-exe-super-premier-2025-26-round1-sendai-viewing-campaigns-3',
    title:
      '〖情報更新・観戦方法まとめ〗コートの最前席が当たるキャンペーンや、入場＆観戦無料招待のご案内',
    summary:
      '仙台ROUND.1（2/28-3/1）に向け、観戦方法と各種キャンペーン情報を更新。無料招待（事前フォーム＋公式LINE）、ゼビオ店舗レシート提示でコートサイド席（先着）、抽選プレゼント等の導線をまとめて案内。',
    sourceUrl: 'https://3x3exe.com/superpremier/25-26campaign/',
    imageUrl: null,
    publishedAt: '2026-02-27',
    updatedAt: '2026-03-01T00:00:00Z',
    relatedTeams: [],
  },
  {
    id: 4,
    slug: '3x3-women-national-team-first-camp-additional-call-ups-4',
    title: '3×3女子日本代表 第1次強化合宿 追加招集メンバー発表',
    summary:
      'JBAが3×3女子日本代表の第1次強化合宿（3/1〜）に向け、追加招集メンバーを発表。強化と選手層拡大を目的に、合宿体制を更新した。',
    sourceUrl: 'https://www.japanbasketball.jp/japan/85325',
    imageUrl: null,
    publishedAt: '2026-02-28',
    updatedAt: '2026-03-01T00:00:00Z',
    relatedTeams: [],
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
