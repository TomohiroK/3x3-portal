import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { NewsArticle } from '@/types/domain';
import { formatDateShort, isNewlyUpdated } from '@/lib/utils/date';
import { NewBadge } from './NewBadge';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const isNew = isNewlyUpdated(article.updatedAt);

  const cardClass =
    'card flex gap-4 p-4 transition-colors focus-visible:outline ' +
    (article.sourceUrl
      ? 'hover:border-brand-orange/50 cursor-pointer'
      : 'cursor-default opacity-80');

  const inner = (
    <>
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
        <div className="flex items-center gap-2 mb-1">
          {isNew && <NewBadge />}
          <p className="text-xs text-gray-500">{formatDateShort(article.publishedAt)}</p>
        </div>
        <h3 className="font-semibold text-white leading-snug line-clamp-2 mb-1">
          {article.title}
          {article.sourceUrl && (
            <ExternalLink
              size={12}
              className="inline-block ml-1.5 text-gray-500 align-middle"
              aria-hidden="true"
            />
          )}
        </h3>
        {article.summary && (
          <p className="text-sm text-gray-400 line-clamp-2">{article.summary}</p>
        )}
        {article.relatedTeams.length > 0 && (
          <ul className="mt-1.5 flex flex-wrap gap-1" aria-label="関連チーム">
            {article.relatedTeams.map((team) => (
              <li
                key={team.id}
                className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-2 py-0.5 text-xs text-brand-orange"
              >
                {team.name}
              </li>
            ))}
          </ul>
        )}
        {article.updatedAt !== article.publishedAt && (
          <p className="mt-1 text-xs text-gray-600">
            更新: {formatDateShort(article.updatedAt)}
          </p>
        )}
      </div>
    </>
  );

  if (article.sourceUrl) {
    return (
      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={`${article.title} を元サイトで読む`}
      >
        {inner}
      </a>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}
