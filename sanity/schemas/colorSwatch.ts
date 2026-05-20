import { createElement } from 'react';
import { defineType, defineField } from 'sanity';

export const colorSwatch = defineType({
  name: 'colorSwatch',
  title: 'Color Swatch',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorFamily',
      title: 'Color Family',
      type: 'reference',
      to: [{ type: 'colorFamily' }],
    }),
    defineField({
      name: 'hexCode',
      title: 'HEX Code',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
    }),
    defineField({
      name: 'rgbCode',
      title: 'RGB Code',
      type: 'string',
      placeholder: 'rgb(232, 221, 211)',
    }),
    defineField({
      name: 'textureImage',
      title: 'Texture Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Close-up of the surface texture',
    }),
    defineField({
      name: 'roomSceneImage',
      title: 'Room Scene Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'The color applied in a real room setting',
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Warm', value: 'warm' },
          { title: 'Cool', value: 'cool' },
          { title: 'Neutral', value: 'neutral' },
          { title: 'Bold', value: 'bold' },
          { title: 'Subtle', value: 'subtle' },
        ],
      },
    }),
    defineField({
      name: 'applicableProducts',
      title: 'Applicable Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'name.zh', subtitle: 'hexCode' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || 'Untitled',
        subtitle,
        media: () => createElement('div', {
          style: {
            width: '100%',
            height: '100%',
            backgroundColor: subtitle || '#ccc',
            borderRadius: '50%',
          },
        }),
      };
    },
  },
});
