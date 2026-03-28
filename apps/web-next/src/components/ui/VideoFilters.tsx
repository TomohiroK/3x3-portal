'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  value: string;
  label: string;
}

interface VideoFiltersProps {
  categories: Category[];
  currentCategory: string;
}

export function VideoFilters({ categories, currentCategory }: VideoFiltersProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function handleClick(value: string) {
    const url = value === 'all' ? '/videos' : `/videos?category=${value}`;
    startTransition(() => {
      router.push(url);
    });
  }

  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="カテゴリで絞り込み">
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => handleClick(cat.value)}
          aria-pressed={currentCategory === cat.value}
          className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors select-none whitespace-nowrap ${
            currentCategory === cat.value
              ? 'bg-brand-orange border-brand-orange text-white'
              : 'border-brand-muted bg-brand-surface text-gray-400 hover:border-gray-500 hover:text-gray-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
