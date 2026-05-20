import { StructureBuilder } from 'sanity/structure';

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('ETNA CMS')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      S.listItem()
        .title('Products')
        .icon(() => '🎨')
        .child(
          S.list()
            .title('Products')
            .items([
              S.listItem()
                .title('All Products')
                .schemaType('product')
                .child(S.documentTypeList('product').title('All Products')),
              S.listItem()
                .title('Categories')
                .schemaType('productCategory')
                .child(S.documentTypeList('productCategory').title('Categories')),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Colors')
        .icon(() => '🌈')
        .child(
          S.list()
            .title('Colors')
            .items([
              S.listItem()
                .title('All Swatches')
                .schemaType('colorSwatch')
                .child(S.documentTypeList('colorSwatch').title('All Swatches')),
              S.listItem()
                .title('Color Families')
                .schemaType('colorFamily')
                .child(S.documentTypeList('colorFamily').title('Color Families')),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Case Studies')
        .icon(() => '📸')
        .child(S.documentTypeList('caseStudy').title('Case Studies')),

      S.divider(),

      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(S.documentTypeList('page').title('Pages')),
    ]);
