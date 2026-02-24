/**
 * Players list page.
 * DB schema for players is not yet finalized — shows a placeholder until
 * the `players` table is available.
 */
import type { Metadata } from 'next';
import { EmptyState } from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: '選手',
  description: '3x3バスケットボールの選手一覧',
};

export default function PlayersPage() {
  return (
    <div className="portal-container py-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">選手</h1>
      <EmptyState
        title="選手情報は準備中です"
        description="近日公開予定です。しばらくお待ちください。"
      />
    </div>
  );
}
