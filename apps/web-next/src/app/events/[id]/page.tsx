/**
 * Event detail page.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getEventById } from '@/lib/repositories/event.repository';
import { formatDate } from '@/lib/utils/date';
import { parseIntParam } from '@/lib/utils/params';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const eventId = parseIntParam(id, 0);
  if (!eventId) return { title: 'イベント' };

  const event = await getEventById(eventId).catch(() => null);
  if (!event) return { title: 'イベントが見つかりません' };

  return {
    title: event.name,
    description: event.description ?? `${event.name} — ${event.location}`,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const eventId = parseIntParam(id, 0);

  if (!eventId) notFound();

  const event = await getEventById(eventId).catch(() => null);
  if (!event) notFound();

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
            {event.location}
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
      </div>
    </div>
  );
}
