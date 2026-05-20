import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'textSection' },
        { type: 'imageFullWidth' },
        { type: 'imageGallery' },
        { type: 'colorSwatchGrid' },
        { type: 'productHighlight' },
        { type: 'timeline' },
        { type: 'quote' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'object', fields: [
          { name: 'zh', title: '中文', type: 'string' },
          { name: 'en', title: 'English', type: 'string' },
        ] },
        { name: 'metaDescription', title: 'Meta Description', type: 'object', fields: [
          { name: 'zh', title: '中文', type: 'text', rows: 3 },
          { name: 'en', title: 'English', type: 'text', rows: 3 },
        ] },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.zh' },
  },
});
