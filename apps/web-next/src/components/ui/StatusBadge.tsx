import type { EventStatus } from '@/types/domain';

const STATUS_LABELS: Record<EventStatus, string> = {
  upcoming: '開催予定',
  ongoing: '開催中',
  completed: '終了',
  cancelled: '中止',
};

const STATUS_CLASSES: Record<EventStatus, string> = {
  upcoming: 'badge-orange',
  ongoing: 'badge-green',
  completed: 'badge-gray',
  cancelled: 'badge bg-red-500/20 text-red-400',
};

interface StatusBadgeProps {
  status: EventStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={STATUS_CLASSES[status]} role="status" aria-label={`ステータス: ${STATUS_LABELS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
