'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/events', label: 'イベント' },
  { href: '/teams', label: 'チーム' },
  { href: '/videos', label: '動画' },
  { href: '/rankings', label: 'ランキング' },
  { href: '/guide', label: 'ガイド' },
  { href: '/venues', label: '会場' },
  { href: '/news', label: 'ニュース' },
  { href: '/blog', label: 'ブログ' },
] as const;

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden rounded-md p-2 text-gray-400 hover:text-white focus-visible:outline"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        type="button"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {/* Drawer */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu panel */}
          <nav
            id="mobile-nav"
            aria-label="モバイルナビゲーション"
            className="fixed inset-x-0 top-14 z-40 bg-brand-surface border-b border-brand-muted md:hidden"
          >
            <ul className="portal-container flex flex-col py-2">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center py-3.5 text-base font-medium border-b border-brand-muted last:border-0 transition-colors ${
                        isActive
                          ? 'text-brand-accent'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <span className="w-1 h-4 rounded-full bg-brand-accent mr-3" aria-hidden="true" />
                      )}
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
