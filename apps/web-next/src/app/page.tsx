/**
 * Home page — Server Component with ISR (revalidate every 12 h).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Trophy, Newspaper } from 'lucide-react';
import { EventCard } from '@/components/ui/EventCard';
import { NewsCard } from '@/components/ui/NewsCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { getUpcomingEvents } from '@/lib/repositories/event.repository';
import { getLatestNews } from '@/lib/repositories/news.repository';
import { WebsiteJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 43200; // 12 h

export const metadata: Metadata = {
  title: {
    absolute: "3x3 Observer's Hub | 3x3バスケットボール 情報ポータル",
  },
  description: '国内・海外の3x3バスケットボール大会・イベント・ニュースを日本語で発信。開催スケジュール、チーム、会場情報をまとめてチェック。',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [upcomingEvents, latestNews] = await Promise.all([
    getUpcomingEvents(6).catch(() => []),
    getLatestNews(4).catch(() => []),
  ]);

  return (
    <>
      <WebsiteJsonLd />
      {/* Hero — full-width video with overlay CTA */}
      <section aria-label="ヒーロービデオ">
        <div className="relative w-full aspect-video overflow-hidden">
          {/* 動画: autoplay/muted/loop/playsInline でモバイル含め自動再生 */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/hero-poster.jpg"
            preload="none"
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
          >
            {/* VP9 を先に宣言（Chrome/Firefox が優先選択） */}
            <source src="/videos/hero.webm" type="video/webm" />
            {/* Safari / 古いブラウザ向けフォールバック */}
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          {/* Hero content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent mb-2">
              3x3 Basketball Portal
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
              試合日程・チーム情報を
              <br className="hidden sm:block" />
              まとめてチェック
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-200 max-w-lg drop-shadow">
              国内外の3x3バスケットボール大会・チーム・ランキングをワンストップで
            </p>
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <Link
                href="/events"
                className="rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent/80 transition-colors shadow-lg"
              >
                大会スケジュール
              </Link>
              <Link
                href="/guide"
                className="rounded-lg bg-white/15 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/25 transition-colors shadow-lg"
              >
                3x3入門ガイド
              </Link>
            </div>
          </div>
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
