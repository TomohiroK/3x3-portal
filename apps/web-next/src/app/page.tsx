/**
 * Home page — Server Component with ISR (revalidate every 60 s).
 * Fetches upcoming events and latest news in parallel.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { EventCard } from '@/components/ui/EventCard';
import { NewsCard } from '@/components/ui/NewsCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { getUpcomingEvents } from '@/lib/repositories/event.repository';
import { getLatestNews } from '@/lib/repositories/news.repository';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'ホーム',
  description: '3x3バスケットボールの最新イベントとニュースをチェック',
};

export default async function HomePage() {
  // Parallel data fetch — avoid waterfall
  const [upcomingEvents, latestNews] = await Promise.all([
    getUpcomingEvents(6).catch(() => []),
    getLatestNews(4).catch(() => []),
  ]);

  return (
    <div className="portal-container py-8 space-y-12">
      {/* Hero */}
      <section aria-labelledby="hero-heading">
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
        >
          <span className="text-brand-orange">3x3</span> Basketball Portal
        </h1>
        <p className="text-gray-400 max-w-lg">
          イベント・チーム・選手情報をいち早くチェック。
        </p>
      </section>

      {/* Upcoming Events */}
      <section aria-labelledby="events-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="events-heading" className="text-xl font-semibold text-white">
            開催予定のイベント
          </h2>
          <Link
            href="/events"
            className="flex items-center gap-1 text-sm text-brand-orange hover:underline"
          >
            すべて見る <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <EmptyState
            title="開催予定のイベントはありません"
            description="近日中に更新される予定です。"
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Latest News */}
      <section aria-labelledby="news-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="news-heading" className="text-xl font-semibold text-white">
            最新ニュース
          </h2>
          <Link
            href="/news"
            className="flex items-center gap-1 text-sm text-brand-orange hover:underline"
          >
            すべて見る <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {latestNews.length === 0 ? (
          <EmptyState title="ニュースはまだありません" />
        ) : (
          <ul className="flex flex-col gap-3" role="list">
            {latestNews.map((article) => (
              <li key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
