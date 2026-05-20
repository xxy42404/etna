import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { sanityFetch } from '@/lib/sanity/fetch';
import { productBySlugQuery, allProductSlugsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { RichText } from '@/components/shared/RichText';
import { ColorSwatch } from '@/components/colors/ColorSwatch';
import { ImageGallery } from '@/components/shared/ImageGallery';

interface ProductDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: allProductSlugsQuery });
  return (slugs || []).flatMap((slug) => [
    { locale: 'zh', slug },
    { locale: 'en', slug },
  ]);
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  const product = await sanityFetch<any>({
    query: productBySlugQuery,
    params: { slug },
  });

  if (!product) {
    return (
      <div className="py-section px-6 text-center text-neutral-500">
        Product not found
      </div>
    );
  }

  const name = locale === 'zh' ? product.name?.zh || product.name?.en : product.name?.en || product.name?.zh;
  const shortDesc = locale === 'zh'
    ? product.shortDescription?.zh
    : product.shortDescription?.en;
  const body = locale === 'zh' ? product.body?.zh : product.body?.en;
  const categoryName = locale === 'zh'
    ? product.category?.name?.zh
    : product.category?.name?.en;
  const heroUrl = product.heroImage ? urlFor(product.heroImage).width(1600).height(900).url() : null;

  return (
    <div>
      {/* Hero */}
      {heroUrl && (
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <Image
            src={heroUrl}
            alt={name || ''}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="py-section px-6">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/products"
            className="inline-block text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8"
          >
            ← {t('backToList')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main content */}
            <div className="lg:col-span-3">
              {categoryName && (
                <span className="text-xs text-brand-500 uppercase tracking-wide">
                  {categoryName}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-4xl text-neutral-800 mt-2 mb-6">
                {name}
              </h1>
              {shortDesc && (
                <p className="text-lg text-neutral-500 leading-relaxed mb-8">
                  {shortDesc}
                </p>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <section className="mb-12">
                  <h2 className="font-serif text-xl text-neutral-800 mb-6">{t('features')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((f: any, i: number) => {
                      const label = locale === 'zh' ? f.label?.zh : f.label?.en;
                      const desc = locale === 'zh' ? f.description?.zh : f.description?.en;
                      return (
                        <div key={i} className="flex gap-4 p-4 bg-neutral-50 rounded-sm">
                          {f.icon && <span className="text-2xl">{f.icon}</span>}
                          <div>
                            <h4 className="text-sm font-medium text-neutral-700">{label}</h4>
                            {desc && <p className="text-sm text-neutral-500 mt-1">{desc}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Body */}
              {body && (
                <section className="mb-12">
                  <RichText value={body} />
                </section>
              )}

              {/* Spec Table */}
              {product.specTable && product.specTable.length > 0 && (
                <section className="mb-12">
                  <h2 className="font-serif text-xl text-neutral-800 mb-6">{t('specifications')}</h2>
                  <div className="border border-neutral-200 rounded-sm divide-y divide-neutral-200">
                    {product.specTable.map((row: any, i: number) => {
                      const key = locale === 'zh' ? row.key?.zh : row.key?.en;
                      const value = locale === 'zh' ? row.value?.zh : row.value?.en;
                      return (
                        <div key={i} className="flex">
                          <div className="w-1/3 p-4 bg-neutral-50 text-sm text-neutral-600">{key}</div>
                          <div className="w-2/3 p-4 text-sm text-neutral-800">{value}</div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {product.gallery && product.gallery.length > 0 && (
                <section>
                  <ImageGallery images={product.gallery} />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              {/* Available Colors */}
              {product.availableColors && product.availableColors.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-serif text-xl text-neutral-800 mb-6">{t('availableColors')}</h2>
                  <div className="flex flex-wrap gap-4">
                    {product.availableColors.map((swatch: any) => (
                      <ColorSwatch key={swatch._id} swatch={swatch} locale={locale} size="sm" />
                    ))}
                  </div>
                </div>
              )}

              {/* Related Cases */}
              {product.caseStudies && product.caseStudies.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl text-neutral-800 mb-6">{t('relatedCases')}</h2>
                  <div className="space-y-4">
                    {product.caseStudies.map((c: any) => {
                      const caseTitle = locale === 'zh' ? c.title?.zh : c.title?.en;
                      const coverUrl = c.coverImage
                        ? urlFor(c.coverImage).width(400).height(250).url()
                        : null;
                      return (
                        <Link
                          key={c._id}
                          href={`/cases/${c.slug.current}`}
                          className="flex gap-4 group"
                        >
                          <div className="w-24 h-16 bg-neutral-200 rounded-sm flex-shrink-0 relative overflow-hidden">
                            {coverUrl && (
                              <Image src={coverUrl} alt={caseTitle || ''} fill className="object-cover" sizes="96px" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-neutral-700 group-hover:text-brand-500 transition-colors">
                              {caseTitle}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
