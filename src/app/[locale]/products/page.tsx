import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProductCard } from '@/components/products/ProductCard';
import { sanityFetch } from '@/lib/sanity/fetch';
import { allProductsQuery, productCategoriesQuery } from '@/lib/sanity/queries';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  const [products, categories] = await Promise.all([
    sanityFetch<Array<any>>({ query: allProductsQuery }),
    sanityFetch<Array<any>>({ query: productCategoriesQuery }),
  ]);

  return (
    <div className="py-section px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('all')} />

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            <span className="text-xs px-4 py-2 bg-neutral-800 text-neutral-100 rounded-sm">
              {t('all')}
            </span>
            {categories.map((cat: any) => {
              const name = locale === 'zh' ? cat.name?.zh : cat.name?.en;
              return (
                <span
                  key={cat._id}
                  className="text-xs px-4 py-2 bg-white text-neutral-500 rounded-sm border border-neutral-200 cursor-pointer hover:border-neutral-300 transition-colors"
                >
                  {name}
                </span>
              );
            })}
          </div>
        )}

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 mt-12">{t('noProducts')}</p>
        )}
      </div>
    </div>
  );
}
