/**
 * Event detail page.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, ArrowLeft, Globe, Instagram } from 'lucide-react';

/** X (formerly Twitter) の公式ロゴ SVG */
function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TeamCategoryBadge } from '@/components/ui/TeamCategoryBadge';
import { getEventById } from '@/lib/repositories/event.repository';
import { getTeamsByIds } from '@/lib/repositories/team.repository';
import { findVenueByLocation } from '@/lib/repositories/venue.repository';
import { formatDate } from '@/lib/utils/date';
import { parseIntParam } from '@/lib/utils/params';

export const revalidate = 43200; // 12 h

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const eventId = parseIntParam(id, 0);
  if (!eventId) return { title: 'イベント' };

  const event = await getEventById(eventId).catch(() => null);
  if (!event) return { title: 'イベントが見つかりません' };

  const description = event.description
    ?? `${event.name}（${event.location}）の3x3バスケットボールイベント情報。開催日程・ステータス・公式リンクを掲載。`;
  return {
    title: event.name,
    description,
    openGraph: {
      title: event.name,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: event.name,
      description,
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const eventId = parseIntParam(id, 0);

  if (!eventId) notFound();

  const event = await getEventById(eventId).catch(() => null);
  if (!event) notFound();

  const matchedVenue = findVenueByLocation(event.location);
  const participantTeams = await getTeamsByIds(event.participantTeamIds).catch(() => []);

  return (
    <div className="portal-container py-8 space-y-6">
      <Link
        href="/events"
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-orange transition-colors"
      >
        <ArrowLeft size={14} aria-hidden="true" /> イベント一覧に戻る
      </Link>

      <div className="space-y-4">
        <div className="flex items-start gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-white flex-1">{event.name}</h1>
          <StatusBadge status={event.status} />
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <Calendar size={15} aria-hidden="true" />
            {formatDate(event.startDate)}
            {event.endDate && event.endDate !== event.startDate && (
              <> ～ {formatDate(event.endDate)}</>
            )}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={15} aria-hidden="true" />
            {matchedVenue ? (
              <Link
                href={`/venues?search=${encodeURIComponent(matchedVenue.name)}`}
                className="hover:text-brand-orange underline underline-offset-2 transition-colors"
                aria-label={`会場「${matchedVenue.name}」の詳細を見る`}
              >
                {event.location}
              </Link>
            ) : (
              event.location
            )}
          </span>
          <span>
            <span
              className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${
                event.country === '日本'
                  ? 'bg-green-500/15 text-green-300'
                  : 'bg-violet-500/15 text-violet-300'
              }`}
            >
              {event.country === '日本' ? '国内' : `海外・${event.country}`}
            </span>
          </span>
        </div>

        {event.description && (
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-2">概要</h2>
            <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* External links */}
        {(event.websiteUrl || event.xAccount || event.instagramAccount || event.tiktokAccount) && (
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-3">リンク</h2>
            <ul className="flex flex-wrap gap-2">
              {event.websiteUrl && (
                <li>
                  <a
                    href={event.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 transition-colors"
                  >
                    <Globe size={15} aria-hidden="true" />
                    公式サイト
                  </a>
                </li>
              )}
              {event.xAccount && (
                <li>
                  <a
                    href={`https://x.com/${event.xAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <XLogo size={15} />
                    @{event.xAccount}
                  </a>
                </li>
              )}
              {event.instagramAccount && (
                <li>
                  <a
                    href={`https://instagram.com/${event.instagramAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-pink-500/15 text-pink-300 hover:bg-pink-500/25 transition-colors"
                  >
                    <Instagram size={15} aria-hidden="true" />
                    @{event.instagramAccount}
                  </a>
                </li>
              )}
              {event.tiktokAccount && (
                <li>
                  <a
                    href={`https://tiktok.com/@${event.tiktokAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors"
                  >
                    <span className="text-xs font-extrabold leading-none" aria-hidden="true">TikTok</span>
                    @{event.tiktokAccount}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Participant teams */}
        {participantTeams.length > 0 && (
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-3">
              参加チーム
              <span className="ml-2 text-xs font-normal text-gray-500">
                {participantTeams.length} チーム
              </span>
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2" role="list">
              {participantTeams.map((team) => (
                <li key={team.id}>
                  <Link
                    href={`/teams/${team.id}`}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 bg-brand-muted hover:bg-brand-muted/70 transition-colors group"
                  >
                    {/* ロゴ or 頭文字 */}
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-brand-surface flex items-center justify-center text-sm font-bold text-brand-accent overflow-hidden">
                      {team.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-brand-orange transition-colors">
                        {team.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{team.location}</p>
                    </div>
                    <TeamCategoryBadge category={team.category} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
