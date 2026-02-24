/**
 * Team detail page.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowLeft, Twitter, Instagram } from 'lucide-react';
import { getTeamById } from '@/lib/repositories/team.repository';
import { parseIntParam } from '@/lib/utils/params';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const teamId = parseIntParam(id, 0);
  if (!teamId) return { title: 'チーム' };

  const team = await getTeamById(teamId).catch(() => null);
  if (!team) return { title: 'チームが見つかりません' };

  return {
    title: team.name,
    description: `${team.name} — ${team.location}`,
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
            <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-brand-orange">
              {team.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold text-white">{team.name}</h1>
          <p className="flex items-center gap-1.5 text-sm text-gray-400">
            <MapPin size={14} aria-hidden="true" />
            {team.location}
          </p>

          {/* Social links */}
          <div className="flex gap-3 pt-1">
            {team.xAccount && (
              <a
                href={`https://twitter.com/${team.xAccount}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label={`${team.name} の X (Twitter)`}
              >
                <Twitter size={18} aria-hidden="true" />
              </a>
            )}
            {team.instagramAccount && (
              <a
                href={`https://instagram.com/${team.instagramAccount}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label={`${team.name} の Instagram`}
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
