import { defineType, defineField } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      group: 'basic',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      group: 'basic',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'spaceType',
      title: 'Space Type',
      type: 'object',
      group: 'basic',
      fields: [
        { name: 'zh', title: '中文', type: 'string', options: { list: [
          { title: '住宅', value: 'residential' },
          { title: '商业', value: 'commercial' },
          { title: '酒店', value: 'hotel' },
          { title: '办公', value: 'office' },
        ] } },
        { name: 'en', title: 'English', type: 'string', options: { list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Hotel', value: 'hotel' },
          { title: 'Office', value: 'office' },
        ] } },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      group: 'basic',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'area',
      title: 'Area',
      type: 'string',
      group: 'basic',
      placeholder: '120 m²',
    }),
    defineField({
      name: 'productsUsed',
      title: 'Products Used',
      type: 'array',
      group: 'basic',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'colorsUsed',
      title: 'Colors Used',
      type: 'array',
      group: 'basic',
      of: [{ type: 'reference', to: [{ type: 'colorSwatch' }] }],
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'zh', title: '中文', type: 'array', of: [
          { type: 'block' },
          { type: 'image' },
        ] },
        { name: 'en', title: 'English', type: 'array', of: [
          { type: 'block' },
          { type: 'image' },
        ] },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true }, fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
      ] }],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before & After',
      type: 'object',
      group: 'media',
      fields: [
        { name: 'beforeImage', title: 'Before', type: 'image', options: { hotspot: true } },
        { name: 'afterImage', title: 'After', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured (appears on homepage)',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
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
    select: {
      title: 'title.zh',
      subtitle: 'location.zh',
      media: 'coverImage',
    },
  },
});
