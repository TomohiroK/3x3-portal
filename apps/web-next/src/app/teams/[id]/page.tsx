/**
 * Team detail page.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowLeft, Globe, Instagram } from 'lucide-react';

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

import { getTeamById } from '@/lib/repositories/team.repository';
import { parseIntParam } from '@/lib/utils/params';
import { TeamCategoryBadge } from '@/components/ui/TeamCategoryBadge';

export const revalidate = 43200; // 12 h

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const teamId = parseIntParam(id, 0);
  if (!teamId) return { title: 'チーム' };

  const team = await getTeamById(teamId).catch(() => null);
  if (!team) return { title: 'チームが見つかりません' };

  const description = `${team.name}（${team.location}）の3x3バスケットボールチーム情報。公式サイト・SNSリンクを掲載。`;
  return {
    title: team.name,
    description,
    openGraph: {
      title: team.name,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: team.name,
      description,
    },
  };
}

export default async function TeamDetailPage({ params }: PageProps) {
  const { id } = await params;
  const teamId = parseIntParam(id, 0);

  if (!teamId) notFound();

  const team = await getTeamById(teamId).catch(() => null);
  if (!team) notFound();

  return (
    <div className="portal-container py-8 space-y-6">
      <Link
        href="/teams"
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-orange transition-colors"
      >
        <ArrowLeft size={14} aria-hidden="true" /> チーム一覧に戻る
      </Link>

      <div className="space-y-4">
        {/* Team header card */}
        <div className="card p-6 flex items-start gap-5">
          {/* Team logo */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-brand-muted">
            {team.imageUrl ? (
              <Image
                src={team.imageUrl}
                alt={`${team.name} のロゴ`}
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-brand-accent">
                {team.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <TeamCategoryBadge category={team.category} />
            </div>
            <h1 className="text-2xl font-bold text-white">{team.name}</h1>
            <p className="flex items-center gap-1.5 text-sm text-gray-400">
              <MapPin size={14} aria-hidden="true" />
              {team.location}
            </p>
          </div>
        </div>

        {/* External links */}
        {(team.websiteUrl || team.xAccount || team.instagramAccount || team.tiktokAccount) && (
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-3">リンク</h2>
            <ul className="flex flex-wrap gap-2">
              {team.websiteUrl && (
                <li>
                  <a
                    href={team.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 transition-colors"
                  >
                    <Globe size={15} aria-hidden="true" />
                    公式サイト
                  </a>
                </li>
              )}
              {team.xAccount && (
                <li>
                  <a
                    href={`https://x.com/${team.xAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <XLogo size={15} />
                    @{team.xAccount}
                  </a>
                </li>
              )}
              {team.instagramAccount && (
                <li>
                  <a
                    href={`https://instagram.com/${team.instagramAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-pink-500/15 text-pink-300 hover:bg-pink-500/25 transition-colors"
                  >
                    <Instagram size={15} aria-hidden="true" />
                    @{team.instagramAccount}
                  </a>
                </li>
              )}
              {team.tiktokAccount && (
                <li>
                  <a
                    href={`https://tiktok.com/@${team.tiktokAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors"
                  >
                    <span className="text-xs font-extrabold leading-none" aria-hidden="true">TikTok</span>
                    @{team.tiktokAccount}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
