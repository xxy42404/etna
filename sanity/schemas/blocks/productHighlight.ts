import { defineType, defineField } from 'sanity';

export const productHighlight = defineType({
  name: 'productHighlight',
  title: 'Product Highlight',
  type: 'object',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'product.name.zh', media: 'product.heroImage' },
    prepare({ title, media }: { title?: string; media?: unknown }) {
      return { title: title || 'Product Highlight', media: media as never };
    },
  },
});
