import { defineType, defineField } from 'sanity';

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline',
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
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [{
        type: 'object',
        name: 'timelineEvent',
        fields: [
          { name: 'year', title: 'Year', type: 'string' },
          { name: 'heading', title: 'Heading', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
          ] },
          { name: 'body', title: 'Body', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'text' },
            { name: 'en', title: 'English', type: 'text' },
          ] },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        ],
        preview: {
          select: { title: 'year', subtitle: 'heading.zh' },
        },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading.zh' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Timeline' };
    },
  },
});
