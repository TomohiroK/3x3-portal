/**
 * News repository — mock implementation (no DB required).
 * Replace with DB-backed implementation when DATABASE_URL is available.
 */
import type { NewsArticle, NewsFilters, PaginatedResult } from '@/types/domain';

const MOCK_NEWS: NewsArticle[] = [
  {
    id: 1,
    slug: 'japan-3x3-championships-2026-final-day1-recap-1',
    title: '〖FINAL / Day1総評〗女子は FLOWLISH GUNMA らが4強入り。男子は SHINAGAWA CITY らが準決勝へ',
    summary:
      'JBA主催「第11回3×3日本選手権大会」FINALが横浜BUNTAIで開幕。Day1はベスト16と準々決勝が行われ、男女の4強が決定。注目選手の活躍や各カードの流れを総評。',
    sourceUrl: 'https://3x3japanchampionships2026.japanbasketball.jp/news/145/',
    imageUrl: 'https://3x3japanchampionships2026.japanbasketball.jp/wp-content/uploads/mood_YOKOHAMA-BUNTAI.jpg',
    publishedAt: '2026-02-22',
    updatedAt: '2026-02-24T00:00:00Z',
    relatedTeamId: 1,
    relatedTeamName: 'SHINAGAWA CITY 3x3 BASKETBALL CLUB',
  },
  {
    id: 2,
    slug: 'japan-3x3-championships-2026-final-first-time-champions-2',
    title: '〖第11回3x3日本選手権大会ファイナル〗横浜BUNTAIで白熱の2日間…男女ともに大会初優勝チームが誕生',
    summary:
      '第11回3x3日本選手権FINALが横浜BUNTAIで開催。男女各16チームがノックアウト方式で争い、男子はSHINAGAWA CITY、女子はFLOWLISH GUNMAがそれぞれ大会初優勝を達成。',
    sourceUrl: 'https://basketballking.jp/news/japan/20260223/597597.html',
    imageUrl: 'https://basketballking.jp/wp-content/uploads/2026/02/Noguchi-1.jpg',
    publishedAt: '2026-02-23',
    updatedAt: '2026-02-24T00:00:00Z',
    relatedTeamId: 1,
    relatedTeamName: 'SHINAGAWA CITY 3x3 BASKETBALL CLUB',
  },
  {
    id: 3,
    slug: '3x3-women-development-camp-2026-members-announced-3',
    title: '3×3女子日本代表がディベロップメントキャンプ参加メンバー24名を発表…目的は選手の発掘と育成',
    summary:
      'JBAが3x3女子のディベロップメントキャンプ実施と参加24名を発表。Wリーグや大学で活躍する選手を招集し、3x3の魅力理解と強化・発掘の場として位置づけている。',
    sourceUrl: 'https://basketballking.jp/news/japan/20260223/597627.html',
    imageUrl: 'https://basketballking.jp/wp-content/uploads/2026/02/3x3.jpg',
    publishedAt: '2026-02-23',
    updatedAt: '2026-02-24T00:00:00Z',
    relatedTeamId: null,
    relatedTeamName: null,
  },
  {
    id: 4,
    slug: '3x3-women-national-team-first-camp-la2028-4',
    title: '3×3女子日本代表がロサンゼルスオリンピックに向けて第1次合宿を実施、国内ランキングトップ10を含めた15名が参加',
    summary:
      'JBAが3×3女子日本代表の第1次強化合宿メンバーを発表。アジアカップ2026や国際大会を見据え、国内ランキング上位を中心に選出。ディベロップメントキャンプから追加招集の可能性も示唆。',
    sourceUrl: 'https://basket-count.com/article/detail/253060',
    imageUrl: null,
    publishedAt: '2026-02-24',
    updatedAt: '2026-02-24T00:00:00Z',
    relatedTeamId: null,
    relatedTeamName: null,
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
    result = result.filter((n) => n.relatedTeamId === filters.teamId);
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
