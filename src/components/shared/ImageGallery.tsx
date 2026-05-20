'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface GalleryImage {
  _key: string;
  alt?: string;
  caption?: string;
  asset?: unknown;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  layout?: '2col' | '3col' | 'masonry';
}

export function ImageGallery({ images, layout = '3col' }: ImageGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const cols = layout === '2col' ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <>
      <div className={`grid grid-cols-1 ${cols} gap-4`}>
        {images.map((img, i) => (
          <button
            key={img._key || i}
            onClick={() => setSelected(i)}
            className="relative aspect-[4/3] overflow-hidden rounded-sm group cursor-pointer"
          >
            <Image
              src={urlFor(img).width(800).height(600).url()}
              alt={img.alt || ''}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={urlFor(images[selected]).width(1600).url()}
              alt={images[selected].alt || ''}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
