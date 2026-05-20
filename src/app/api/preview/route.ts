import { defineEnableDraftMode } from 'next-sanity/draft-mode';

export const { GET } = defineEnableDraftMode({
  clientConfig: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-05-20',
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  },
});
