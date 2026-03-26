import Link from 'next/link';
import Image from 'next/image';
import { MobileNav } from './MobileNav';

const NAV_LINKS = [
  { href: '/events', label: 'イベント' },
  { href: '/teams', label: 'チーム' },
  { href: '/venues', label: '会場' },
  { href: '/videos', label: '動画' },
  { href: '/rankings', label: 'ランキング' },
  { href: '/guide', label: 'ガイド' },
  { href: '/news', label: 'ニュース' },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-muted bg-brand-dark/95 backdrop-blur-sm">
      <div className="portal-container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label="3x3 Observer's Hub ホームへ"
        >
          <Image
            src="/android-icon-192x192.png"
            alt="3x3 Observer's Hub"
            width={36}
            height={36}
            className="rounded-sm"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="メインナビゲーション">
          <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-md px-3 py-1.5 text-gray-400 hover:text-white hover:bg-brand-subtle transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile nav (Client Component) */}
        <MobileNav />
      </div>
    </header>
  );
}
