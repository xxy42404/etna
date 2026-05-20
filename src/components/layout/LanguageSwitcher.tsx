'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === 'zh' ? 'en' : 'zh';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors disabled:opacity-50"
      aria-label="Switch language"
    >
      {locale === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
