import { defineType, defineField } from 'sanity';

export const quote = defineType({
  name: 'quote',
  title: 'Quote / Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: { title: 'text.zh' },
    prepare({ title }: { title?: string }) {
      return { title: (title || 'Quote').slice(0, 50) };
    },
  },
});
