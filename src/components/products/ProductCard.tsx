import { Link } from '@/i18n/navigation';
import { urlFor } from '@/lib/sanity/image';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    slug: { current: string };
    name: { zh?: string; en?: string };
    heroImage?: unknown;
    shortDescription?: { zh?: string; en?: string };
    category?: { slug?: { current: string }; name?: { zh?: string; en?: string } };
  };
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const name = locale === 'zh' ? product.name?.zh || product.name?.en : product.name?.en || product.name?.zh;
  const desc = locale === 'zh'
    ? product.shortDescription?.zh || product.shortDescription?.en
    : product.shortDescription?.en || product.shortDescription?.zh;
  const imageUrl = product.heroImage ? urlFor(product.heroImage).width(600).height(450).url() : null;

  return (
    <Link
      href={`/products/${product.slug.current}`}
      className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[4/3] bg-neutral-200 relative overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name || ''}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-neutral-800 group-hover:text-brand-500 transition-colors">
          {name}
        </h3>
        {desc && (
          <p className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {desc}
          </p>
        )}
      </div>
    </Link>
  );
}
