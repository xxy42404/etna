import { defineDocuments } from 'sanity/presentation';

export const presentationDocuments = defineDocuments([
  {
    type: 'page',
    filter: `_type == "page" && slug.current == $slug`,
    params: { slug: 'page-slug' },
  },
  {
    type: 'product',
    filter: `_type == "product" && slug.current == $slug`,
    params: { slug: 'product-slug' },
  },
  {
    type: 'caseStudy',
    filter: `_type == "caseStudy" && slug.current == $slug`,
    params: { slug: 'case-slug' },
  },
]);
