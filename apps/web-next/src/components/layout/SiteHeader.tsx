import Link from 'next/link';
import { Menu } from 'lucide-react';

const NAV_LINKS = [
  { href: '/events', label: 'イベント' },
  { href: '/teams', label: 'チーム' },
  { href: '/players', label: '選手' },
  { href: '/venues', label: '会場' },
  { href: '/news', label: 'ニュース' },
] as const;

/**
 * Site-wide header. Server Component — no client state.
 * Mobile nav toggle would require a small Client Component (MobileNav).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-muted bg-brand-dark/90 backdrop-blur-sm">
      <div className="portal-container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white hover:text-brand-orange transition-colors"
          aria-label="3x3 Basketball Portal ホームへ"
        >
          <span className="text-brand-orange">3x3</span>
          <span className="hidden sm:inline">Basketball Portal</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="メインナビゲーション">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-brand-orange transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button — client interactivity handled by MobileNav */}
        <MobileNavToggle />
      </div>
    </header>
  );
}

/**
 * Mobile hamburger — minimal client component inline.
 * Kept small: only toggles a CSS class via data attribute.
 */
function MobileNavToggle() {
  return (
    <button
      className="md:hidden rounded-md p-2 text-gray-300 hover:text-brand-orange focus-visible:outline"
      aria-label="メニューを開く"
      aria-expanded="false"
      aria-controls="mobile-nav"
      type="button"
      // Full mobile nav drawer would be a separate Client Component
      // For now: keyboard-accessible placeholder
    >
      <Menu size={20} aria-hidden="true" />
    </button>
  );
}
