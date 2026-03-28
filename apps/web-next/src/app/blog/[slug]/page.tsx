/**
 * Blog article page — Server Component with ISR.
 * Renders full article content with engagement tracking (client component).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost, listBlogPosts } from '@/lib/repositories/blog.repository';
import { formatDate } from '@/lib/utils/date';
import { BlogEngagement } from '@/components/blog/BlogEngagement';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 43200; // 12 h

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://3x3.tmkproduct.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: '記事が見つかりません' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      section: post.category,
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const result = await listBlogPosts({
    search: '',
    category: '',
    page: 1,
    pageSize: 200,
  });
  return result.items.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: {
            '@type': 'Organization',
            name: "3x3 Observer's Hub",
            url: BASE_URL,
          },
          publisher: {
            '@type': 'Organization',
            name: "3x3 Observer's Hub",
            url: BASE_URL,
          },
          mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
          articleSection: post.category,
          inLanguage: 'ja',
        }}
      />

      <article className="portal-container py-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          ブログ一覧に戻る
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-2.5 py-0.5 text-xs text-brand-orange">
              {post.category}
            </span>
            <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span className="text-sm text-gray-600">{post.readingTime}分で読める</span>
          </div>
          <h1 className="text-2xl font-bold text-white leading-tight sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-3 text-gray-400">{post.excerpt}</p>
        </header>

        {/* Body */}
        <div
          className="prose prose-invert prose-orange max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-brand-muted prose-h2:pb-2
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-li:text-gray-300
            prose-strong:text-white
            prose-a:text-brand-orange hover:prose-a:text-brand-orange/80
            prose-ul:my-4 prose-ol:my-4"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Engagement (Client Component) */}
        <BlogEngagement
          slug={post.slug}
          category={post.category}
          title={post.title}
        />
      </article>
    </>
  );
}
