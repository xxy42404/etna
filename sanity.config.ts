import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemas } from './sanity/schemas';
import { deskStructure } from './sanity/deskStructure';

export default defineConfig({
  name: 'etna-art-paint',
  title: 'ETNA CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'zh', title: '中文' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: [
        'product',
        'productCategory',
        'colorSwatch',
        'colorFamily',
        'caseStudy',
        'page',
        'siteSettings',
      ],
    }),
  ],
  schema: {
    types: schemas,
  },
});
