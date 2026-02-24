import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-muted bg-brand-surface py-8 text-sm text-gray-400">
      <div className="portal-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-gray-200">
          <span className="text-brand-orange">3x3</span> Basketball Portal
        </p>

        <nav aria-label="フッターナビゲーション">
          <ul className="flex flex-wrap gap-4">
            {[
              { href: '/events', label: 'イベント' },
              { href: '/teams', label: 'チーム' },
              { href: '/players', label: '選手' },
              { href: '/venues', label: '会場' },
              { href: '/news', label: 'ニュース' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-brand-orange transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} 3x3 Basketball Portal
        </p>
      </div>
    </footer>
  );
}
