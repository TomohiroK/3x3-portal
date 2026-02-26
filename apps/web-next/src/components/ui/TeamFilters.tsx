'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { TeamCategory } from '@/types/domain';

const CATEGORY_OPTIONS: { value: TeamCategory | ''; label: string }[] = [
  { value: '',        label: 'すべて' },
  { value: 'EXE',    label: 'EXE' },
  { value: '代表',   label: '代表' },
  { value: 'U23',    label: 'U23' },
  { value: '招待',   label: '招待' },
  { value: '一般クラブ', label: '一般クラブ' },
];

const ACTIVE_CLASSES: Record<TeamCategory | '', string> = {
  '':       'bg-brand-orange border-brand-orange text-white',
  'EXE':    'bg-brand-orange border-brand-orange text-white',
  '代表':   'bg-violet-500 border-violet-500 text-white',
  'U23':    'bg-cyan-500 border-cyan-500 text-white',
  '招待':   'bg-amber-500 border-amber-500 text-white',
  '一般クラブ': 'bg-gray-500 border-gray-500 text-white',
};

interface TeamFiltersProps {
  currentSearch: string;
  currentCategory: TeamCategory | '';
}

export function TeamFilters({ currentSearch, currentCategory }: TeamFiltersProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch);
  const [category, setCategory] = useState<TeamCategory | ''>(currentCategory);

  function buildUrl(newSearch: string, newCategory: TeamCategory | '') {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newCategory) params.set('category', newCategory);
    return `/teams${params.size > 0 ? `?${params.toString()}` : ''}`;
  }

  function handleCategoryClick(newCategory: TeamCategory | '') {
    setCategory(newCategory);
    startTransition(() => {
      router.push(buildUrl(search, newCategory));
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      router.push(buildUrl(search, category));
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="チーム絞り込み">
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
            placeholder="チーム名・地域で検索"
            maxLength={100}
            className="w-full rounded-lg border border-brand-muted bg-brand-surface py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-orange focus:outline-none"
            aria-label="チーム検索"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange/80 focus-visible:outline transition-colors"
        >
          検索
        </button>
      </div>

      {/* Category pill filters */}
      <div className="flex gap-2 flex-wrap" role="group" aria-label="カテゴリで絞り込み">
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleCategoryClick(option.value)}
            aria-pressed={category === option.value}
            className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors select-none whitespace-nowrap ${
              category === option.value
                ? ACTIVE_CLASSES[option.value]
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
