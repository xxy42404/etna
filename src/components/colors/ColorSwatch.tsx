'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface ColorSwatchProps {
  swatch: {
    _id: string;
    name: { zh?: string; en?: string };
    hexCode: string;
    rgbCode?: string;
    textureImage?: unknown;
    roomSceneImage?: unknown;
    mood?: string[];
  };
  locale: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatch({ swatch, locale, size = 'md' }: ColorSwatchProps) {
  const [showDetail, setShowDetail] = useState(false);
  const name = locale === 'zh' ? swatch.name?.zh || swatch.name?.en : swatch.name?.en || swatch.name?.zh;

  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  const textureImageUrl = swatch.textureImage
    ? urlFor(swatch.textureImage).width(200).height(200).url()
    : null;
  const roomImageUrl = swatch.roomSceneImage
    ? urlFor(swatch.roomSceneImage).width(800).height(600).url()
    : null;

  return (
    <>
      <button
        className="flex flex-col items-center gap-3 group"
        onClick={() => setShowDetail(true)}
      >
        <div
          className={`${sizes[size]} rounded-full border border-neutral-200 shadow-sm relative overflow-hidden group-hover:scale-110 transition-transform`}
          style={{ backgroundColor: swatch.hexCode }}
        >
          {textureImageUrl && (
            <Image
              src={textureImageUrl}
              alt={name || ''}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity"
              sizes="80px"
            />
          )}
        </div>
        <span className="text-xs text-neutral-500 text-center">{name}</span>
      </button>

      {showDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-sm max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center gap-6 mb-6">
                <div
                  className="w-24 h-24 rounded-full flex-shrink-0 border border-neutral-200"
                  style={{ backgroundColor: swatch.hexCode }}
                />
                <div>
                  <h3 className="text-xl font-medium text-neutral-800">{name}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{swatch.hexCode}</p>
                  {swatch.rgbCode && (
                    <p className="text-sm text-neutral-400">{swatch.rgbCode}</p>
                  )}
                </div>
              </div>

              {roomImageUrl && (
                <div className="relative aspect-[16/10] mb-6 rounded-sm overflow-hidden">
                  <Image
                    src={roomImageUrl}
                    alt={`${name} - room scene`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}

              {swatch.mood && swatch.mood.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {swatch.mood.map((m) => (
                    <span key={m} className="text-xs px-3 py-1 bg-neutral-100 text-neutral-500 rounded-sm">
                      {m}
                    </span>
                  ))}
                </div>
              )}

              <button
                className="mt-6 w-full h-10 text-sm text-neutral-500 border border-neutral-200 rounded-sm hover:bg-neutral-50 transition-colors"
                onClick={() => setShowDetail(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
