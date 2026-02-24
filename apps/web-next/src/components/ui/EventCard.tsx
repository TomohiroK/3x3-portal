import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import type { PortalEvent } from '@/types/domain';
import { formatDateShort } from '@/lib/utils/date';
import { StatusBadge } from './StatusBadge';

interface EventCardProps {
  event: PortalEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="card flex flex-col gap-3 p-4 hover:border-brand-orange/50 transition-colors focus-visible:outline"
      aria-label={`${event.name} の詳細を見る`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white leading-snug line-clamp-2">{event.name}</h3>
        <StatusBadge status={event.status} />
      </div>

      <div className="flex flex-col gap-1 text-sm text-gray-400">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} aria-hidden="true" />
          {formatDateShort(event.startDate)}
          {event.endDate && event.endDate !== event.startDate && (
            <> ～ {formatDateShort(event.endDate)}</>
          )}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={14} aria-hidden="true" />
          {event.location}
        </span>
      </div>

      {event.description && (
        <p className="text-sm text-gray-400 line-clamp-2">{event.description}</p>
      )}
    </Link>
  );
}
