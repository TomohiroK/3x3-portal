import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import type { Team } from '@/types/domain';
import { formatDateShort, isNewlyUpdated } from '@/lib/utils/date';
import { NewBadge } from './NewBadge';
import { TeamCategoryBadge } from './TeamCategoryBadge';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const isNew = isNewlyUpdated(team.updatedAt);

  return (
    <Link
      href={`/teams/${team.id}`}
      className="card flex items-center gap-4 p-4 hover:border-brand-orange/50 transition-colors focus-visible:outline"
      aria-label={`${team.name} の詳細を見る`}
    >
      {/* Team image */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-brand-muted">
        {team.imageUrl ? (
          <Image
            src={team.imageUrl}
            alt={`${team.name} のロゴ`}
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-lg font-bold text-brand-orange">
            {team.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          {isNew && <NewBadge />}
          <TeamCategoryBadge category={team.category} />
          <p className="font-semibold text-white truncate">{team.name}</p>
        </div>
        <p className="flex items-center gap-1 text-sm text-gray-400 truncate">
          <MapPin size={12} aria-hidden="true" />
          {team.location}
        </p>
        <p className="flex items-center gap-1 text-xs text-gray-600 mt-1">
          <Clock size={11} aria-hidden="true" />
          更新: {formatDateShort(team.updatedAt)}
        </p>
      </div>
    </Link>
  );
}
