import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProductCard } from '@/components/products/ProductCard';
import { CaseCard } from '@/components/cases/CaseCard';
import { ColorSwatch } from '@/components/colors/ColorSwatch';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery, featuredProductsQuery, featuredColorsQuery, featuredCasesQuery } from '@/lib/sanity/queries';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const [settings, products, colors, cases] = await Promise.all([
    sanityFetch<{
      brandName?: { zh?: string; en?: string };
      tagline?: { zh?: string; en?: string };
      brandDescription?: { zh?: string; en?: string };
    } | null>({ query: siteSettingsQuery }),
    sanityFetch<Array<unknown>>({ query: featuredProductsQuery }),
    sanityFetch<Array<unknown>>({ query: featuredColorsQuery }),
    sanityFetch<Array<unknown>>({ query: featuredCasesQuery }),
  ]);

  const brandName = locale === 'zh'
    ? settings?.brandName?.zh || 'ETNA'
    : settings?.brandName?.en || 'ETNA';
  const tagline = locale === 'zh'
    ? settings?.tagline?.zh || '源自自然，归于本真'
    : settings?.tagline?.en || 'Born from Nature, True to Essence';
  const brandDesc = locale === 'zh'
    ? settings?.brandDescription?.zh
    : settings?.brandDescription?.en;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-neutral-200">
        <div className="text-center px-6">
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-800 mb-6 tracking-tight leading-tight">
            {brandName}
          </h1>
          <p className="text-lg text-neutral-500 mb-10 max-w-md mx-auto leading-relaxed">
            {tagline}
          </p>
          <Link
            href="/products"
            className="inline-flex h-12 items-center px-8 text-sm tracking-wide text-neutral-100 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-sm"
          >
            {t('heroCta')}
          </Link>
        </div>
      </section>

      {/* Brand Intro */}
      {brandDesc && (
        <section className="py-section-sm md:py-section px-6">
          <div className="mx-auto max-w-[1200px] text-center">
            <SectionHeading title={t('brandIntro')} />
            <p className="max-w-2xl mx-auto text-lg text-neutral-500 leading-relaxed">
              {brandDesc}
            </p>
            <Link
              href="/brand"
              className="inline-flex mt-8 text-sm text-brand-500 hover:text-brand-600 transition-colors border-b border-brand-300 hover:border-brand-500"
            >
              {t('brandIntroCta')} →
            </Link>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {products && products.length > 0 && (
        <section className="py-section-sm md:py-section px-6 bg-neutral-50">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading title={t('featuredProducts')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} locale={locale} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex text-sm text-brand-500 hover:text-brand-600 transition-colors border-b border-brand-300 hover:border-brand-500"
              >
                {t('featuredProductsCta')} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Color Strip */}
      {colors && colors.length > 0 && (
        <section className="py-section-sm md:py-section px-6">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading title={t('colorInspiration')} />
            <div className="flex gap-6 overflow-x-auto py-8 scrollbar-hide justify-center flex-wrap">
              {colors.map((swatch: any) => (
                <ColorSwatch key={swatch._id} swatch={swatch} locale={locale} />
              ))}
            </div>
            <div className="text-center mt-4">
              <Link
                href="/colors"
                className="inline-flex text-sm text-brand-500 hover:text-brand-600 transition-colors border-b border-brand-300 hover:border-brand-500"
              >
                {t('colorInspirationCta')} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Cases */}
      {cases && cases.length > 0 && (
        <section className="py-section-sm md:py-section px-6 bg-neutral-50">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading title={t('realProjects')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {cases.map((c: any) => (
                <CaseCard key={c._id} caseStudy={c} locale={locale} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/cases"
                className="inline-flex text-sm text-brand-500 hover:text-brand-600 transition-colors border-b border-brand-300 hover:border-brand-500"
              >
                {t('realProjectsCta')} →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
