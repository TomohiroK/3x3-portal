/**
 * Blog repository — reads from JSON data file.
 * Scheduled task appends new posts to src/data/blog/posts.json.
 */
import type { BlogPost, BlogFilters, BlogCategory, PaginatedResult } from '@/types/domain';
import DOMPurify from 'isomorphic-dompurify';
import postsData from '@/data/blog/posts.json';

const ALLOWED_TAGS = ['h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a'];
const ALLOWED_ATTR = ['href', 'target', 'rel'];

// Sanitize body HTML at read time to prevent XSS from malformed JSON data
const posts: BlogPost[] = (postsData as BlogPost[]).map((p) => ({
  ...p,
  body: DOMPurify.sanitize(p.body, { ALLOWED_TAGS, ALLOWED_ATTR }),
}));

export async function listBlogPosts(
  filters: BlogFilters
): Promise<PaginatedResult<BlogPost>> {
  let result = posts;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  // newest first, stable sort by id for same publishedAt
  result = [...result].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.id - a.id
  );

  const total = result.length;
  const offset = (filters.page - 1) * filters.pageSize;
  const items = result.slice(offset, offset + filters.pageSize);

  return { items, total, page: filters.page, pageSize: filters.pageSize };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  return [...posts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.id - a.id)
    .slice(0, limit);
}

export function getAllBlogCategories(): BlogCategory[] {
  return ['戦術解説', 'ルール紹介'];
}
