'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-neutral-300 mt-section">
      <div className="mx-auto max-w-[1200px] px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-xl text-neutral-100 mb-4">
            ETNA
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            源自自然，归于本真
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-200 mb-4 uppercase tracking-wider">
            Links
          </h4>
          <div className="flex gap-4 text-sm text-neutral-400">
            <span>WeChat</span>
            <span>小红书</span>
            <span>抖音</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-200 mb-4 uppercase tracking-wider">
            Contact
          </h4>
          <p className="text-sm text-neutral-400 leading-relaxed">
            电话：400-000-0000<br />
            邮箱：hello@etna-paint.com
          </p>
        </div>
      </div>

      <div className="border-t border-neutral-700">
        <div className="mx-auto max-w-[1200px] px-6 py-6 text-center text-xs text-neutral-500">
          {t('copyright', { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}
