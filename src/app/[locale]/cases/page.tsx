import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CaseCard } from '@/components/cases/CaseCard';
import { sanityFetch } from '@/lib/sanity/fetch';
import { allCasesQuery } from '@/lib/sanity/queries';

interface CasesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CasesPage({ params }: CasesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('cases');

  const cases = await sanityFetch<Array<any>>({ query: allCasesQuery });

  return (
    <div className="py-section px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('all')} />

        {cases && cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {cases.map((c: any) => (
              <CaseCard key={c._id} caseStudy={c} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 mt-12">{t('noCases')}</p>
        )}
      </div>
    </div>
  );
}
