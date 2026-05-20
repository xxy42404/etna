import type { Metadata } from 'next';

interface LocalizedField {
  zh?: string;
  en?: string;
}

interface PageSeo {
  metaTitle?: LocalizedField;
  metaDescription?: LocalizedField;
}

export function buildMetadata({
  locale,
  title,
  description,
  path,
  ogImage,
  seo,
}: {
  locale: string;
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  seo?: PageSeo;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://etna-paint.com';
  const localePrefix = locale === 'zh' ? '' : '/en';
  const seoTitle = locale === 'zh' ? seo?.metaTitle?.zh : seo?.metaTitle?.en;
  const seoDesc = locale === 'zh' ? seo?.metaDescription?.zh : seo?.metaDescription?.en;

  return {
    title: seoTitle || title,
    description: seoDesc || description || '',
    alternates: {
      canonical: `${baseUrl}${localePrefix}${path}`,
      languages: {
        zh: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title: seoTitle || title,
      description: seoDesc || description || '',
      url: `${baseUrl}${localePrefix}${path}`,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}
