/**
 * News repository — reads from JSON data file.
 * Scheduled task updates src/data/news/articles.json.
 */
import type { NewsArticle, NewsFilters, PaginatedResult } from '@/types/domain';
import articlesData from '@/data/news/articles.json';

const articles: NewsArticle[] = articlesData as NewsArticle[];

export async function listNews(filters: NewsFilters): Promise<PaginatedResult<NewsArticle>> {
  let result = articles;

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
  return [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
