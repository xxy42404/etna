import { defineType, defineField } from 'sanity';

export const imageFullWidth = defineType({
  name: 'imageFullWidth',
  title: 'Full-Width Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare({ media }: { media?: unknown }) {
      return { title: 'Full-Width Image', media: media as never };
    },
  },
});
