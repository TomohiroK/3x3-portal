import type { TeamCategory } from '@/types/domain';

const CATEGORY_CLASSES: Record<TeamCategory, string> = {
  'EXE':      'badge bg-brand-orange/20 text-brand-orange',
  '代表':     'badge bg-violet-500/20 text-violet-300',
  'U23':      'badge bg-cyan-500/20 text-cyan-300',
  '招待':     'badge bg-amber-500/20 text-amber-300',
  '一般クラブ': 'badge bg-gray-500/20 text-gray-400',
};

interface TeamCategoryBadgeProps {
  category: TeamCategory;
}

export function TeamCategoryBadge({ category }: TeamCategoryBadgeProps) {
  return (
    <span
      className={`${CATEGORY_CLASSES[category]} whitespace-nowrap`}
      aria-label={`カテゴリ: ${category}`}
    >
      {category}
    </span>
  );
}
