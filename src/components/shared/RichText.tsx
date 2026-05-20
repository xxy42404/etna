import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/image';
import Image from 'next/image';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-neutral-600 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl text-neutral-800 mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl text-neutral-800 mt-8 mb-4">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">{children}</ul>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ''}
          width={1200}
          height={800}
          className="w-full rounded-sm"
        />
        {value.caption && (
          <figcaption className="text-sm text-neutral-400 mt-2 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-500 hover:text-brand-600 border-b border-brand-300 hover:border-brand-500 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

interface RichTextProps {
  value: unknown;
}

export function RichText({ value }: RichTextProps) {
  if (!value) return null;
  return <PortableText value={value as never} components={components} />;
}
