'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { useState } from 'react';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'brand', href: '/brand' },
  { key: 'cases', href: '/cases' },
  { key: 'colors', href: '/colors' },
  { key: 'contact', href: '/contact' },
];

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-neutral-100/90 backdrop-blur-sm border-b border-neutral-200/50">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-serif tracking-tight text-neutral-800 hover:text-brand-500 transition-colors">
          ETNA
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === href
                  ? 'text-brand-500'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {t(key as 'home' | 'products' | 'brand' | 'cases' | 'colors' | 'contact')}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <button
          className="md:hidden p-2 text-neutral-600"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
