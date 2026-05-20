import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ColorSwatch } from '@/components/colors/ColorSwatch';
import { sanityFetch } from '@/lib/sanity/fetch';
import { colorFamiliesQuery } from '@/lib/sanity/queries';

interface ColorsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ColorsPage({ params }: ColorsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('colors');

  const families = await sanityFetch<Array<any>>({ query: colorFamiliesQuery });

  return (
    <div className="py-section px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('title')} />

        {families && families.length > 0 ? (
          <div className="mt-16 space-y-20">
            {families.map((family) => {
              const familyName = locale === 'zh'
                ? family.name?.zh || family.name?.en
                : family.name?.en || family.name?.zh;
              const swatches = family.swatches || [];

              return swatches.length > 0 ? (
                <section key={family._id}>
                  <div className="flex items-center gap-4 mb-8">
                    {family.representativeHex && (
                      <div
                        className="w-6 h-6 rounded-full border border-neutral-200"
                        style={{ backgroundColor: family.representativeHex }}
                      />
                    )}
                    <h2 className="font-serif text-2xl text-neutral-800">{familyName}</h2>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {swatches.map((swatch: any) => (
                      <ColorSwatch key={swatch._id} swatch={swatch} locale={locale} />
                    ))}
                  </div>
                </section>
              ) : null;
            })}
          </div>
        ) : (
          <p className="text-center text-neutral-500 mt-12">{t('all')}</p>
        )}
      </div>
    </div>
  );
}
