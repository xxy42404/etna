import { createElement } from 'react';
import { defineType, defineField } from 'sanity';

export const colorFamily = defineType({
  name: 'colorFamily',
  title: 'Color Family',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'representativeHex',
      title: 'Representative Hex Color',
      type: 'string',
      description: 'e.g. #E8DDD3',
    }),
  ],
  preview: {
    select: { title: 'name.zh', subtitle: 'representativeHex' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || 'Untitled',
        subtitle,
        media: () => createElement('div', {
          style: {
            width: '100%',
            height: '100%',
            backgroundColor: subtitle || '#ccc',
            borderRadius: 2,
          },
        }),
      };
    },
  },
});
