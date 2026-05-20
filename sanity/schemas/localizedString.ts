import { defineField } from 'sanity';

export function localizedString(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'zh', title: '中文', type: 'text', rows: 2 },
      { name: 'en', title: 'English', type: 'text', rows: 2 },
    ],
  });
}

export function localizedText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'zh', title: '中文', type: 'text', rows: 4 },
      { name: 'en', title: 'English', type: 'text', rows: 4 },
    ],
  });
}
