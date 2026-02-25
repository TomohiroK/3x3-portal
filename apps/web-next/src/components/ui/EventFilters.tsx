'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { EventStatus } from '@/types/domain';

const STATUS_OPTIONS: { value: EventStatus | ''; label: string }[] = [
  { value: '', label: 'すべて' },
  { value: '開催予定', label: '開催予定' },
  { value: '開催中', label: '開催中' },
  { value: '終了', label: '終了' },
];

interface EventFiltersProps {
  currentSearch: string;
  currentStatus: EventStatus | '';
}

export function EventFilters({ currentSearch, currentStatus }: EventFiltersProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState<EventStatus | ''>(currentStatus);

  function buildUrl(newSearch: string, newStatus: EventStatus | '') {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newStatus) params.set('status', newStatus);
    return `/events${params.size > 0 ? `?${params.toString()}` : ''}`;
  }

  function handleStatusClick(newStatus: EventStatus | '') {
    setStatus(newStatus);
    startTransition(() => {
      router.push(buildUrl(search, newStatus));
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      router.push(buildUrl(search, status));
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="イベント絞り込み">
      {/* Search row */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="イベント名・会場で検索"
            maxLength={100}
            className="w-full rounded-lg border border-brand-muted bg-brand-surface py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-orange focus:outline-none"
            aria-label="イベント検索"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange/80 focus-visible:outline transition-colors"
        >
          検索
        </button>
      </div>

      {/* Status pill filters */}
      <div className="flex gap-2 flex-wrap" role="group" aria-label="ステータスで絞り込み">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleStatusClick(option.value)}
            aria-pressed={status === option.value}
            className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors select-none whitespace-nowrap ${
              status === option.value
                ? 'bg-brand-orange border-brand-orange text-white'
                : 'border-brand-muted bg-brand-surface text-gray-400 hover:border-gray-500 hover:text-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </form>
  );
}
