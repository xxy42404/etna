import { defineType, defineField } from 'sanity';

export const colorSwatchGrid = defineType({
  name: 'colorSwatchGrid',
  title: 'Color Swatch Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'colorFamily',
      title: 'Color Family',
      type: 'reference',
      to: [{ type: 'colorFamily' }],
    }),
  ],
  preview: {
    select: { title: 'heading.zh' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Color Swatch Grid' };
    },
  },
});
