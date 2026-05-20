import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { RichText } from '@/components/shared/RichText';
import { ImageGallery } from '@/components/shared/ImageGallery';
import { ColorSwatch } from '@/components/colors/ColorSwatch';
import { ProductCard } from '@/components/products/ProductCard';
import { sanityFetch } from '@/lib/sanity/fetch';
import { pageBySlugQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

interface BrandPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('brand');

  const page = await sanityFetch<any>({
    query: pageBySlugQuery,
    params: { slug: 'brand' },
  });

  const pageTitle = page
    ? (locale === 'zh' ? page.title?.zh || page.title?.en : page.title?.en || page.title?.zh)
    : t('title');

  if (!page || !page.sections) {
    return (
      <div className="py-section px-6">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading title={t('title')} />
          <div className="max-w-3xl mx-auto mt-16 space-y-16 text-center text-neutral-500">
            <p>Content can be edited in the Sanity Studio.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      {page.heroImage && (
        <div className="relative w-full h-[50vh] min-h-[350px]">
          <Image
            src={urlFor(page.heroImage).width(1600).height(700).url()}
            alt={pageTitle}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20 flex items-end">
            <div className="max-w-[1200px] mx-auto px-6 pb-16 w-full">
              <h1 className="font-serif text-4xl text-white">{pageTitle}</h1>
            </div>
          </div>
        </div>
      )}

      <div className="py-section px-6">
        <div className="mx-auto max-w-[1200px]">
          {!page.heroImage && (
            <SectionHeading title={pageTitle} />
          )}

          <div className="max-w-3xl mx-auto mt-16 space-y-24">
            {page.sections.map((section: any, i: number) => {
              switch (section._type) {
                case 'textSection': {
                  const heading = locale === 'zh' ? section.heading?.zh : section.heading?.en;
                  const body = locale === 'zh' ? section.body?.zh : section.body?.en;
                  return (
                    <section key={i}>
                      {heading && (
                        <h2 className="font-serif text-2xl text-neutral-800 mb-6">{heading}</h2>
                      )}
                      {body && <RichText value={body} />}
                    </section>
                  );
                }

                case 'imageFullWidth':
                  return section.image ? (
                    <section key={i}>
                      <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden">
                        <Image
                          src={urlFor(section.image).width(1600).height(900).url()}
                          alt={section.alt || ''}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    </section>
                  ) : null;

                case 'imageGallery':
                  return section.images ? (
                    <section key={i}>
                      <ImageGallery images={section.images} layout={section.layout} />
                    </section>
                  ) : null;

                case 'colorSwatchGrid': {
                  const heading = locale === 'zh' ? section.heading?.zh : section.heading?.en;
                  const swatches = section.colorFamily?.swatches || [];
                  return swatches.length > 0 ? (
                    <section key={i}>
                      {heading && (
                        <h2 className="font-serif text-2xl text-neutral-800 mb-8 text-center">
                          {heading}
                        </h2>
                      )}
                      <div className="flex flex-wrap gap-6 justify-center">
                        {swatches.map((s: any) => (
                          <ColorSwatch key={s._id} swatch={s} locale={locale} />
                        ))}
                      </div>
                    </section>
                  ) : null;
                }

                case 'productHighlight': {
                  const p = section.product;
                  return p ? (
                    <section key={i}>
                      <div className="max-w-sm mx-auto">
                        <ProductCard product={p} locale={locale} />
                      </div>
                    </section>
                  ) : null;
                }

                case 'timeline': {
                  const heading = locale === 'zh' ? section.heading?.zh : section.heading?.en;
                  const events = section.events || [];
                  return events.length > 0 ? (
                    <section key={i}>
                      {heading && (
                        <h2 className="font-serif text-2xl text-neutral-800 mb-12 text-center">
                          {heading}
                        </h2>
                      )}
                      <div className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200" />
                        <div className="space-y-12">
                          {events.map((event: any, ei: number) => {
                            const isLeft = ei % 2 === 0;
                            const eventHeading = locale === 'zh' ? event.heading?.zh : event.heading?.en;
                            const eventBody = locale === 'zh' ? event.body?.zh : event.body?.en;
                            const eventImg = event.image
                              ? urlFor(event.image).width(400).height(300).url()
                              : null;
                            return (
                              <div
                                key={ei}
                                className={`relative pl-10 md:pl-0 md:w-1/2 ${
                                  isLeft ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'
                                }`}
                              >
                                <div className="absolute left-0 md:left-auto md:top-6 w-3 h-3 rounded-full bg-brand-400 border-2 border-white"
                                  style={isLeft ? { right: '-6px', left: 'auto' } : { left: '-6px' }}
                                />
                                <div className="bg-white p-6 rounded-sm shadow-sm">
                                  <span className="text-xs text-brand-500 font-medium">{event.year}</span>
                                  <h3 className="font-serif text-lg text-neutral-800 mt-1">{eventHeading}</h3>
                                  {eventBody && <p className="text-sm text-neutral-500 mt-2">{eventBody}</p>}
                                  {eventImg && (
                                    <div className="mt-4 relative aspect-[4/3] rounded-sm overflow-hidden">
                                      <Image src={eventImg} alt={eventHeading || ''} fill className="object-cover" sizes="400px" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                  ) : null;
                }

                case 'quote': {
                  const text = locale === 'zh' ? section.text?.zh : section.text?.en;
                  const author = locale === 'zh' ? section.author?.zh : section.author?.en;
                  return text ? (
                    <section key={i}>
                      <blockquote className="text-center max-w-2xl mx-auto">
                        <p className="font-serif text-2xl text-neutral-700 leading-relaxed italic">
                          "{text}"
                        </p>
                        {author && (
                          <footer className="mt-6 text-sm text-neutral-500">— {author}</footer>
                        )}
                      </blockquote>
                    </section>
                  ) : null;
                }

                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
