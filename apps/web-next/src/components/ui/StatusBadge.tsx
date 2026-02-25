import type { EventStatus } from '@/types/domain';

const STATUS_CLASSES: Record<EventStatus, string> = {
  '開催予定': 'badge-orange',
  '開催中': 'badge-green',
  '終了': 'badge-gray',
  '中止': 'badge bg-red-500/20 text-red-400',
};

interface StatusBadgeProps {
  status: EventStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${STATUS_CLASSES[status]} whitespace-nowrap`} role="status" aria-label={`ステータス: ${status}`}>
      {status}
    </span>
  );
}
