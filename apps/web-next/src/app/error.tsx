'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to monitoring service in production
    console.error('[ErrorBoundary]', error.message);
  }, [error]);

  return (
    <div className="portal-container flex flex-col items-center justify-center py-24 text-center gap-4">
      <p className="text-5xl font-bold text-red-400">エラー</p>
      <h1 className="text-xl font-bold text-white">問題が発生しました</h1>
      <p className="text-sm text-gray-400 max-w-sm">
        ページの読み込みに失敗しました。再試行するか、ホームに戻ってください。
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange/80 transition-colors focus-visible:outline"
        >
          再試行
        </button>
        <Link
          href="/"
          className="rounded-lg border border-brand-muted px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors focus-visible:outline"
        >
          ホームへ
        </Link>
      </div>
    </div>
  );
}
