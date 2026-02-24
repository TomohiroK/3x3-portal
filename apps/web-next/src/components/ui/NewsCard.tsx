import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/types/domain';
import { formatDateShort } from '@/lib/utils/date';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={`/news/${article.id}`}
      className="card flex gap-4 p-4 hover:border-brand-orange/50 transition-colors focus-visible:outline"
      aria-label={`${article.title} を読む`}
    >
      {/* Thumbnail */}
      {article.imageUrl && (
        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-brand-muted">
          <Image
            src={article.imageUrl}
            alt=""
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 mb-1">{formatDateShort(article.publishedAt)}</p>
        <h3 className="font-semibold text-white leading-snug line-clamp-2 mb-1">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-sm text-gray-400 line-clamp-2">{article.summary}</p>
        )}
        {article.relatedTeamName && (
          <p className="mt-1 text-xs text-brand-orange">{article.relatedTeamName}</p>
        )}
      </div>
    </Link>
  );
}
