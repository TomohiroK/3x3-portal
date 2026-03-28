import Link from 'next/link';
import type { BlogPost } from '@/types/domain';
import { formatDateShort, isNewlyUpdated } from '@/lib/utils/date';
import { NewBadge } from './NewBadge';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const isNew = isNewlyUpdated(post.updatedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card flex flex-col gap-2 p-4 cursor-pointer focus-visible:outline hover:border-brand-orange/40 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-2 py-0.5 text-xs text-brand-orange">
          {post.category}
        </span>
        {isNew && <NewBadge />}
        <span className="text-xs text-gray-500">{formatDateShort(post.publishedAt)}</span>
        <span className="text-xs text-gray-600">{post.readingTime}分で読める</span>
      </div>
      <h3 className="font-semibold text-white leading-snug line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
    </Link>
  );
}
