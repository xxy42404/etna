import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { sanityFetch } from '@/lib/sanity/fetch';
import { caseBySlugQuery, allCaseSlugsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { RichText } from '@/components/shared/RichText';
import { ImageGallery } from '@/components/shared/ImageGallery';
import { ColorSwatch } from '@/components/colors/ColorSwatch';

interface CaseDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: allCaseSlugsQuery });
  return (slugs || []).flatMap((slug) => [
    { locale: 'zh', slug },
    { locale: 'en', slug },
  ]);
}

export default async function CaseDetailPage({ params }: CaseDetailProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cases');

  const caseData = await sanityFetch<any>({
    query: caseBySlugQuery,
    params: { slug },
  });

  if (!caseData) {
    return (
      <div className="py-section px-6 text-center text-neutral-500">
        Case study not found
      </div>
    );
  }

  const title = locale === 'zh' ? caseData.title?.zh || caseData.title?.en : caseData.title?.en || caseData.title?.zh;
  const subtitle = locale === 'zh'
    ? caseData.subtitle?.zh || caseData.subtitle?.en
    : caseData.subtitle?.en || caseData.subtitle?.zh;
  const location = locale === 'zh'
    ? caseData.location?.zh || caseData.location?.en
    : caseData.location?.en || caseData.location?.zh;
  const spaceType = locale === 'zh' ? caseData.spaceType?.zh : caseData.spaceType?.en;
  const body = locale === 'zh' ? caseData.body?.zh : caseData.body?.en;
  const coverUrl = caseData.coverImage
    ? urlFor(caseData.coverImage).width(1600).height(700).url()
    : null;

  const spaceTypeLabels: Record<string, string> = {
    residential: locale === 'zh' ? '住宅空间' : 'Residential',
    commercial: locale === 'zh' ? '商业空间' : 'Commercial',
    hotel: locale === 'zh' ? '酒店空间' : 'Hotel',
    office: locale === 'zh' ? '办公空间' : 'Office',
  };

  return (
    <div>
      {coverUrl && (
        <div className="relative w-full h-[50vh] min-h-[350px]">
          <Image
            src={coverUrl}
            alt={title || ''}
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
            href="/cases"
            className="inline-block text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8"
          >
            ← {t('backToList')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              {spaceType && (
                <span className="text-xs text-brand-500 uppercase tracking-wide">
                  {spaceTypeLabels[spaceType] || spaceType}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-4xl text-neutral-800 mt-2 mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg text-neutral-500 mb-6">{subtitle}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-8">
                {location && <span>{location}</span>}
                {caseData.area && <span>{caseData.area}</span>}
              </div>

              {body && (
                <section className="mb-12">
                  <RichText value={body} />
                </section>
              )}

              {caseData.gallery && caseData.gallery.length > 0 && (
                <section>
                  <ImageGallery images={caseData.gallery} />
                </section>
              )}
            </div>

            <div className="lg:col-span-2">
              {/* Before & After */}
              {caseData.beforeAfter && (
                <div className="mb-12">
                  <h2 className="font-serif text-xl text-neutral-800 mb-6">{t('beforeAfter')}</h2>
                  <div className="space-y-4">
                    {caseData.beforeAfter.beforeImage && (
                      <div>
                        <p className="text-xs text-neutral-400 mb-2 uppercase tracking-wider">Before</p>
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                          <Image
                            src={urlFor(caseData.beforeAfter.beforeImage).width(600).height(450).url()}
                            alt="Before"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                        </div>
                      </div>
                    )}
                    {caseData.beforeAfter.afterImage && (
                      <div>
                        <p className="text-xs text-neutral-400 mb-2 uppercase tracking-wider">After</p>
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                          <Image
                            src={urlFor(caseData.beforeAfter.afterImage).width(600).height(450).url()}
                            alt="After"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Products Used */}
              {caseData.productsUsed && caseData.productsUsed.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-serif text-xl text-neutral-800 mb-6">{t('productsUsed')}</h2>
                  <div className="space-y-3">
                    {caseData.productsUsed.map((p: any) => {
                      const pName = locale === 'zh' ? p.name?.zh : p.name?.en;
                      const pImg = p.heroImage
                        ? urlFor(p.heroImage).width(80).height(60).url()
                        : null;
                      return (
                        <Link
                          key={p._id}
                          href={`/products/${p.slug.current}`}
                          className="flex items-center gap-3 text-sm text-neutral-700 hover:text-brand-500 transition-colors"
                        >
                          {pImg && (
                            <Image src={pImg} alt={pName || ''} width={40} height={30} className="rounded-sm object-cover" />
                          )}
                          {pName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Colors Used */}
              {caseData.colorsUsed && caseData.colorsUsed.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl text-neutral-800 mb-6">{t('colorsUsed')}</h2>
                  <div className="flex flex-wrap gap-4">
                    {caseData.colorsUsed.map((c: any) => (
                      <ColorSwatch key={c._id} swatch={c} locale={locale} size="sm" />
                    ))}
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
