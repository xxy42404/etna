import { Link } from '@/i18n/navigation';
import { urlFor } from '@/lib/sanity/image';
import Image from 'next/image';

interface CaseCardProps {
  caseStudy: {
    slug: { current: string };
    title: { zh?: string; en?: string };
    coverImage?: unknown;
    spaceType?: { zh?: string; en?: string };
    location?: { zh?: string; en?: string };
    area?: string;
  };
  locale: string;
}

const spaceTypeLabels: Record<string, Record<string, string>> = {
  residential: { zh: '住宅空间', en: 'Residential' },
  commercial: { zh: '商业空间', en: 'Commercial' },
  hotel: { zh: '酒店空间', en: 'Hotel' },
  office: { zh: '办公空间', en: 'Office' },
};

export function CaseCard({ caseStudy, locale }: CaseCardProps) {
  const title = locale === 'zh' ? caseStudy.title?.zh || caseStudy.title?.en : caseStudy.title?.en || caseStudy.title?.zh;
  const location = locale === 'zh'
    ? caseStudy.location?.zh || caseStudy.location?.en
    : caseStudy.location?.en || caseStudy.location?.zh;
  const spaceTypeValue = locale === 'zh' ? caseStudy.spaceType?.zh : caseStudy.spaceType?.en;
  const spaceTypeLabel = spaceTypeValue
    ? spaceTypeLabels[spaceTypeValue]?.[locale] || spaceTypeValue
    : '';
  const imageUrl = caseStudy.coverImage
    ? urlFor(caseStudy.coverImage).width(800).height(500).url()
    : null;

  return (
    <Link
      href={`/cases/${caseStudy.slug.current}`}
      className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/10] bg-neutral-200 relative overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title || ''}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
      <div className="p-6">
        <span className="text-xs text-brand-500 uppercase tracking-wide">
          {spaceTypeLabel}
        </span>
        <h3 className="mt-2 text-lg font-medium text-neutral-800 group-hover:text-brand-500 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          {[location, caseStudy.area].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  );
}
