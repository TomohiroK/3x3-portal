import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-muted bg-brand-surface py-8 text-sm text-gray-500">
      <div className="portal-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="フッターナビゲーション">
          <ul className="flex flex-wrap gap-4">
            {[
              { href: '/events', label: 'イベント' },
              { href: '/teams', label: 'チーム' },
              { href: '/venues', label: '会場' },
              { href: '/news', label: 'ニュース' },
              { href: '/terms', label: '利用規約' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} 3x3 Observer&apos;s Hub
        </p>
      </div>
    </footer>
  );
}
