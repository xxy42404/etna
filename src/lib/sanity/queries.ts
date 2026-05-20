import { groq } from 'next-sanity';

// Site Settings — singleton with all global config
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  brandName,
  tagline,
  brandDescription,
  logo,
  ogImage,
  socialLinks[]{
    platform,
    label,
    url,
    qrCode
  },
  purchaseLinks[]{
    platform,
    label,
    url,
    isActive
  },
  contactInfo{
    phone,
    email,
    address,
    workingHours,
    mapEmbedUrl
  },
  copyright
}`;

// Featured Products for homepage
export const featuredProductsQuery = groq`*[_type == "product" && isFeatured == true] | order(order asc) [0...4]{
  _id,
  slug,
  name,
  category->{ slug, name },
  heroImage,
  shortDescription
}`;

// All Products
export const allProductsQuery = groq`*[_type == "product"] | order(order asc) {
  _id,
  slug,
  name,
  category->{ slug, name },
  heroImage,
  shortDescription,
  isFeatured
}`;

// Single Product by slug
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id,
  slug,
  name,
  category->{ slug, name },
  heroImage,
  shortDescription,
  body,
  specTable[]{
    key,
    value
  },
  features[]{
    icon,
    label,
    description
  },
  availableColors[]->{
    _id,
    name,
    hexCode,
    rgbCode,
    colorFamily->{ name },
    textureImage,
    roomSceneImage
  },
  gallery,
  caseStudies[]->{
    _id,
    slug,
    title,
    coverImage,
    spaceType,
    location,
    area
  },
  seo
}`;

// Product Categories
export const productCategoriesQuery = groq`*[_type == "productCategory"] | order(order asc) {
  _id,
  slug,
  name,
  description
}`;

// All Color Families with swatches
export const colorFamiliesQuery = groq`*[_type == "colorFamily"] | order(order asc) {
  _id,
  slug,
  name,
  representativeHex,
  order,
  "swatches": *[_type == "colorSwatch" && references(^._id)] | order(order asc) {
    _id,
    name,
    hexCode,
    rgbCode,
    textureImage,
    roomSceneImage,
    mood
  }
}`;

// Featured Colors (for homepage color strip)
export const featuredColorsQuery = groq`*[_type == "colorSwatch"] | order(order asc) [0...12]{
  _id,
  name,
  hexCode,
  colorFamily->{ name },
  textureImage
}`;

// Featured Case Studies for homepage
export const featuredCasesQuery = groq`*[_type == "caseStudy" && isFeatured == true] | order(_updatedAt desc) [0...3]{
  _id,
  slug,
  title,
  coverImage,
  spaceType,
  location,
  area
}`;

// All Case Studies
export const allCasesQuery = groq`*[_type == "caseStudy"] | order(_updatedAt desc) {
  _id,
  slug,
  title,
  subtitle,
  coverImage,
  spaceType,
  location,
  area,
  productsUsed[]->{ name },
  colorsUsed[]->{ name, hexCode }
}`;

// Single Case Study by slug
export const caseBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  slug,
  title,
  subtitle,
  coverImage,
  spaceType,
  location,
  area,
  productsUsed[]->{
    _id,
    slug,
    name,
    heroImage
  },
  colorsUsed[]->{
    _id,
    name,
    hexCode,
    rgbCode,
    textureImage
  },
  body,
  gallery,
  beforeAfter,
  seo
}`;

// Page by slug (for brand story, etc.)
export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  slug,
  title,
  heroImage,
  sections[]{
    _type,
    _type == "textSection" => {
      heading,
      body
    },
    _type == "imageFullWidth" => {
      image,
      alt
    },
    _type == "imageGallery" => {
      images,
      layout
    },
    _type == "colorSwatchGrid" => {
      heading,
      colorFamily->{
        name,
        "swatches": *[_type == "colorSwatch" && references(^._id)] | order(order asc) {
          _id,
          name,
          hexCode,
          textureImage
        }
      }
    },
    _type == "productHighlight" => {
      product->{
        _id,
        slug,
        name,
        heroImage,
        shortDescription
      }
    },
    _type == "timeline" => {
      heading,
      events[]{
        year,
        heading,
        body,
        image
      }
    },
    _type == "quote" => {
      text,
      author
    }
  },
  seo
}`;

// Page slugs for static generation
export const allPageSlugsQuery = groq`*[_type == "page" && defined(slug.current)].slug.current`;
export const allProductSlugsQuery = groq`*[_type == "product" && defined(slug.current)].slug.current`;
export const allCaseSlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current)].slug.current`;
