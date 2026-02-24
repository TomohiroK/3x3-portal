import Link from 'next/link';
import { Menu } from 'lucide-react';

const NAV_LINKS = [
  { href: '/events', label: 'イベント' },
  { href: '/teams', label: 'チーム' },
  { href: '/players', label: '選手' },
  { href: '/venues', label: '会場' },
  { href: '/news', label: 'ニュース' },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-muted bg-brand-dark/95 backdrop-blur-sm">
      <div className="portal-container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white hover:text-brand-accent transition-colors"
          aria-label="3x3 Observer's Hub ホームへ"
        >
          <span className="text-brand-accent font-extrabold">3x3</span>
          <span className="hidden sm:inline text-white">Observer&apos;s Hub</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="メインナビゲーション">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <MobileNavToggle />
      </div>
    </header>
  );
}

function MobileNavToggle() {
  return (
    <button
      className="md:hidden rounded-md p-2 text-gray-400 hover:text-white focus-visible:outline"
      aria-label="メニューを開く"
      aria-expanded="false"
      aria-controls="mobile-nav"
      type="button"
    >
      <Menu size={20} aria-hidden="true" />
    </button>
  );
}
