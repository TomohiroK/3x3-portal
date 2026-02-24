/**
 * Venues list page.
 * Placeholder until `venues` table is defined.
 */
import type { Metadata } from 'next';
import { EmptyState } from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: '会場',
  description: '3x3バスケットボールの会場情報',
};

export default function VenuesPage() {
  return (
    <div className="portal-container py-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">会場</h1>
      <EmptyState
        title="会場情報は準備中です"
        description="近日公開予定です。しばらくお待ちください。"
      />
    </div>
  );
}
