/**
 * Home page — Server Component with ISR (revalidate every 60 s).
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Trophy, Newspaper } from 'lucide-react';
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
  const [upcomingEvents, latestNews] = await Promise.all([
    getUpcomingEvents(6).catch(() => []),
    getLatestNews(4).catch(() => []),
  ]);

  return (
    <>
      {/* Hero — full-width, outside portal-container */}
      <section aria-label="ヒーロー画像">
        <div className="relative w-full aspect-[2816/1536]">
          <Image
            src="/hero-section-3x3.jpg"
            alt="3x3 Observer's Hub"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Bottom fade into page background */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(to bottom, transparent, #0B0E1A)' }}
            aria-hidden="true"
          />
        </div>
      </section>

      <div className="portal-container pb-14 space-y-14">
        {/* Upcoming Events */}
        <section aria-labelledby="events-heading">
          <div className="flex items-center justify-between mb-5">
            <h2 id="events-heading" className="flex items-center gap-2 text-lg font-bold text-white">
              <Trophy size={18} className="text-brand-accent" aria-hidden="true" />
              開催予定のイベント
            </h2>
            <Link
              href="/events"
              className="flex items-center gap-1 text-sm text-brand-accent hover:underline"
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
          <div className="flex items-center justify-between mb-5">
            <h2 id="news-heading" className="flex items-center gap-2 text-lg font-bold text-white">
              <Newspaper size={18} className="text-brand-accent" aria-hidden="true" />
              最新ニュース
            </h2>
            <Link
              href="/news"
              className="flex items-center gap-1 text-sm text-brand-accent hover:underline"
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
    </>
  );
}
