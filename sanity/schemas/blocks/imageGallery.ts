import { defineType, defineField } from 'sanity';

export const imageGallery = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2col' },
          { title: '3 Columns', value: '3col' },
          { title: 'Masonry', value: 'masonry' },
        ],
      },
      initialValue: '3col',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Image Gallery' };
    },
  },
});
