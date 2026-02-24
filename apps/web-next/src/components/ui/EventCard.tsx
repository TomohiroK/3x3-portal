import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import type { PortalEvent } from '@/types/domain';
import { formatDateShort, isNewlyUpdated } from '@/lib/utils/date';
import { StatusBadge } from './StatusBadge';
import { NewBadge } from './NewBadge';

interface EventCardProps {
  event: PortalEvent;
}

/** 国内（日本）か海外かを示すバッジ */
function CountryBadge({ country }: { country: string }) {
  const isDomestic = country === '日本';
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none whitespace-nowrap ${
        isDomestic
          ? 'bg-green-500/15 text-green-300'
          : 'bg-violet-500/15 text-violet-300'
      }`}
    >
      {isDomestic ? '国内' : `海外・${country}`}
    </span>
  );
}

export function EventCard({ event }: EventCardProps) {
  const isNew = isNewlyUpdated(event.updatedAt);

  return (
    <Link
      href={`/events/${event.id}`}
      className="card flex flex-col gap-2.5 p-4 hover:border-brand-orange/50 transition-colors focus-visible:outline"
      aria-label={`${event.name} の詳細を見る`}
    >
      {/* バッジ行: NEW・国内/海外・ステータスを横並びに */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {isNew && <NewBadge />}
        <CountryBadge country={event.country} />
        <StatusBadge status={event.status} />
      </div>

      {/* タイトル */}
      <h3 className="font-semibold text-white leading-snug line-clamp-2">{event.name}</h3>

      {/* 日付・場所 */}
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-base font-bold text-white">
          <Calendar size={15} className="text-brand-accent flex-shrink-0" aria-hidden="true" />
          {formatDateShort(event.startDate)}
          {event.endDate && event.endDate !== event.startDate && (
            <> ～ {formatDateShort(event.endDate)}</>
          )}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-gray-400">
          <MapPin size={14} className="flex-shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{event.location}</span>
        </span>
      </div>

      {event.description && (
        <p className="text-sm text-gray-400 line-clamp-2">{event.description}</p>
      )}

      <p className="flex items-center gap-1 text-xs text-gray-600 mt-auto pt-1">
        <Clock size={11} aria-hidden="true" />
        更新: {formatDateShort(event.updatedAt)}
      </p>
    </Link>
  );
}
