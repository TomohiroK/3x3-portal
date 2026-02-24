import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="portal-container flex flex-col items-center justify-center py-24 text-center gap-4">
      <p className="text-6xl font-bold text-brand-orange">404</p>
      <h1 className="text-2xl font-bold text-white">ページが見つかりません</h1>
      <p className="text-gray-400">お探しのページは存在しないか、移動した可能性があります。</p>
      <Link
        href="/"
        className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange/80 transition-colors focus-visible:outline"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
