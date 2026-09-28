export type Locale = 'ko' | 'en';
export type Localized = Record<Locale, string>;
export type MediaSlot =
  | 'hero'
  | 'product'
  | 'gallery'
  | 'category'
  | 'story'
  | 'detail';
export type Media = {
  id: string;
  src: string | null;
  alt: Localized;
  label: string;
  tone: 'sand' | 'sage' | 'stone' | 'rose' | 'ink';
  fit: 'contain' | 'cover';
  focalPoint?: { x: number; y: number };
  width?: number;
  height?: number;
};
export type Category = {
  id: string;
  slug: string;
  name: Localized;
  subtitle: Localized;
  description: Localized;
  image: Media;
  order: number;
};
export type Product = {
  id: string;
  slug: string;
  categoryId: string;
  name: Localized;
  summary: Localized;
  description: Localized;
  features: Localized[];
  price: number | null;
  salePrice: number | null;
  shippingFee: number | null;
  purchaseUrl: string | null;
  status: 'draft' | 'published' | 'archived';
  availability: 'available' | 'coming-soon' | 'sold-out';
  featured: boolean;
  order: number;
  images: Media[];
  detailImages: Media[];
};
export type SiteContent = {
  schemaVersion: 1;
  settings: {
    storeUrl: string;
    businessEmail: string;
    phone: string;
    fax: string;
    address: Localized;
  };
  home: {
    headline: Record<Locale, [string, string, string]>;
    description: Localized;
    hero: Media;
    /** Additional slides after the original hero image. */
    heroSlides: Media[];
    story: Media;
  };
  categories: Category[];
  products: Product[];
};

/** The website reads published content. Draft authorization belongs to the future CMS. */
export interface ContentRepository {
  getPublishedContent(): Promise<SiteContent>;
}
