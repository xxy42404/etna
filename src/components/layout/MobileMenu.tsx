'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useEffect } from 'react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { key: string; href: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity md:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-72 bg-neutral-50 z-50 shadow-lg transition-transform md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <span className="text-lg font-serif text-neutral-800">Menu</span>
          <button onClick={onClose} className="p-2 text-neutral-500" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-4">
          {links.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              className={`text-base py-2 border-b border-neutral-100 ${
                pathname === href
                  ? 'text-brand-500'
                  : 'text-neutral-700'
              }`}
            >
              {t(key as 'home' | 'products' | 'brand' | 'cases' | 'colors' | 'contact')}
            </Link>
          ))}
          <div className="pt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}
