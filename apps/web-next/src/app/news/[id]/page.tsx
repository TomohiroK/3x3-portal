/**
 * News article detail page.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getNewsById } from '@/lib/repositories/news.repository';
import { formatDate } from '@/lib/utils/date';
import { parseIntParam } from '@/lib/utils/params';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const articleId = parseIntParam(id, 0);
  if (!articleId) return { title: 'ニュース' };

  const article = await getNewsById(articleId).catch(() => null);
  if (!article) return { title: '記事が見つかりません' };

  return {
    title: article.title,
    description: article.summary ?? article.content.slice(0, 160),
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const articleId = parseIntParam(id, 0);

  if (!articleId) notFound();

  const article = await getNewsById(articleId).catch(() => null);
  if (!article) notFound();

  return (
    <div className="portal-container py-8 space-y-6">
      <Link
        href="/news"
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-orange transition-colors"
      >
        <ArrowLeft size={14} aria-hidden="true" /> ニュース一覧に戻る
      </Link>

      <article className="space-y-5">
        <header className="space-y-3">
          {article.relatedTeamName && (
            <p className="text-sm font-medium text-brand-orange">{article.relatedTeamName}</p>
          )}
          <h1 className="text-2xl font-bold text-white leading-snug">{article.title}</h1>
          <p className="text-sm text-gray-400">{formatDate(article.publishedAt)}</p>
        </header>

        {article.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-brand-muted">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {article.summary && (
          <p className="text-base text-gray-300 font-medium leading-relaxed border-l-2 border-brand-orange pl-4">
            {article.summary}
          </p>
        )}

        <div className="prose prose-invert max-w-none text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </article>
    </div>
  );
}
