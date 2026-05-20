import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'relations', title: 'Relations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'name.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      group: 'basic',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      group: 'basic',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'object',
      group: 'basic',
      fields: [
        { name: 'zh', title: '中文', type: 'text', rows: 2 },
        { name: 'en', title: 'English', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Full Description',
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
      name: 'specTable',
      title: 'Specification Table',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'spec',
        fields: [
          { name: 'key', title: 'Key', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
          ] },
          { name: 'value', title: 'Value', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
          ] },
        ],
        preview: {
          select: { title: 'key.zh', subtitle: 'value.zh' },
        },
      }],
    }),
    defineField({
      name: 'features',
      title: 'Product Features',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'feature',
        fields: [
          { name: 'icon', title: 'Icon (emoji)', type: 'string' },
          { name: 'label', title: 'Label', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
          ] },
          { name: 'description', title: 'Description', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
          ] },
        ],
      }],
    }),
    defineField({
      name: 'availableColors',
      title: 'Available Colors',
      type: 'array',
      group: 'relations',
      of: [{ type: 'reference', to: [{ type: 'colorSwatch' }] }],
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true }, fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ] }],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Related Case Studies',
      type: 'array',
      group: 'relations',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured (appears on homepage)',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      group: 'basic',
      initialValue: 0,
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
      title: 'name.zh',
      subtitle: 'name.en',
      media: 'heroImage',
    },
  },
  orderings: [
    { title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
