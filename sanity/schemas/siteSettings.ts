import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'text', rows: 2 },
        { name: 'en', title: 'English', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'brandDescription',
      title: 'Brand Description (Homepage)',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Share Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{
        type: 'object',
        name: 'socialLink',
        fields: [
          { name: 'platform', title: 'Platform', type: 'string', options: { list: [
            { title: '微信', value: 'wechat' },
            { title: '小红书', value: 'xiaohongshu' },
            { title: '抖音', value: 'douyin' },
          ] } },
          { name: 'label', title: 'Display Label', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
          { name: 'qrCode', title: 'QR Code (for WeChat)', type: 'image', options: { hotspot: false } },
        ],
        preview: {
          select: { title: 'label', subtitle: 'platform' },
        },
      }],
    }),
    defineField({
      name: 'purchaseLinks',
      title: 'Purchase Links',
      type: 'array',
      of: [{
        type: 'object',
        name: 'purchaseLink',
        fields: [
          { name: 'platform', title: 'Platform', type: 'string', options: { list: [
            { title: '淘宝', value: 'taobao' },
            { title: '京东', value: 'jd' },
          ] } },
          { name: 'label', title: 'Display Label', type: 'string' },
          { name: 'url', title: 'URL', type: 'url' },
          { name: 'isActive', title: 'Active', type: 'boolean', initialValue: true },
        ],
        preview: {
          select: { title: 'label', subtitle: 'url' },
        },
      }],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            { name: 'zh', title: '中文', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'workingHours',
          title: 'Working Hours',
          type: 'object',
          fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
          ],
        },
        { name: 'mapEmbedUrl', title: 'Map Embed URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
  ],
});
