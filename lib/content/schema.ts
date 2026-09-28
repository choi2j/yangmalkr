import { z } from 'zod';
import type { SiteContent, Media } from './types.ts';
export type { SiteContent, Media, Product, Category, Localized, Locale } from './types.ts';
export type State = { revision: number; savedAt: string; content: SiteContent; baseRevision?: string | null; baseProject?: string };
export const localMediaPattern = /^\/media\/([a-f0-9]{64}\.webp)$/;
const text = z.string().max(12000);
const localized = z.object({ ko: text, en: text });
const id = z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100);
export function isPublicUrl(value: string) {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && !['localhost', '127.0.0.1', '[::1]'].includes(u.hostname); } catch { return false; }
}
const https = z.string().max(2048).refine(isPublicUrl, '공개 HTTPS 주소를 입력하세요.');
const media = z.object({
  id, src: z.union([z.null(), https, z.string().regex(localMediaPattern)]),
  alt: localized, label: z.string().max(100), tone: z.enum(['sand', 'sage', 'stone', 'rose', 'ink']),
  fit: z.enum(['contain', 'cover']), focalPoint: z.object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) }).optional(),
  width: z.number().int().positive().max(24000000).optional(), height: z.number().int().positive().max(24000000).optional(),
});
const money = z.number().int().min(0).max(100000000).nullable();
export const contentSchema = z.object({
  schemaVersion: z.literal(1),
  settings: z.object({ storeUrl: https, businessEmail: z.email().max(254), phone: z.string().max(80), fax: z.string().max(80), address: localized }),
  home: z.object({ headline: z.object({ ko: z.tuple([text, text, text]), en: z.tuple([text, text, text]) }), description: localized, hero: media, heroSlides: z.array(media).max(19).default([]), story: media }),
  categories: z.array(z.object({ id, slug, name: localized, subtitle: localized, description: localized, image: media, order: z.number().int().min(0).max(10000) })).min(1).max(50),
  products: z.array(z.object({
    id, slug, categoryId: id, name: localized, summary: localized, description: localized,
    features: z.array(localized).max(30), price: money, salePrice: money, shippingFee: money,
    purchaseUrl: https.nullable(), status: z.enum(['draft', 'published', 'archived']),
    availability: z.enum(['available', 'coming-soon', 'sold-out']), featured: z.boolean(),
    order: z.number().int().min(0).max(10000), images: z.array(media).min(1).max(20), detailImages: z.array(media).max(30),
  })).max(1000),
}).superRefine((data, ctx) => {
  const issue = (message: string) => ctx.addIssue({ code: 'custom', message });
  for (const [label, values] of [
    ['카테고리 ID', data.categories.map(c => c.id)], ['카테고리 주소', data.categories.map(c => c.slug)],
    ['상품 ID', data.products.map(p => p.id)], ['상품 주소', data.products.map(p => `${p.categoryId}/${p.slug}`)],
  ] as const) if (new Set(values).size !== values.length) issue(`${label}가 중복되었습니다.`);
  for (const p of data.products) {
    if (!data.categories.some(c => c.id === p.categoryId)) issue(`${p.name.ko}: 카테고리가 없습니다.`);
    if (!p.name.ko.trim()) issue('상품의 한국어 이름은 필수입니다.');
    if (p.salePrice !== null && (p.price === null || p.salePrice > p.price)) issue(`${p.name.ko}: 할인가를 정상가 이하로 입력하세요.`);
  }
});
export function parseContent(value: unknown): SiteContent { return contentSchema.parse(value); }
export function mapMedia(content: SiteContent, fn: (m: Media) => Media): SiteContent {
  return { ...content, home: { ...content.home, hero: fn(content.home.hero), heroSlides: content.home.heroSlides.map(fn), story: fn(content.home.story) }, categories: content.categories.map(c => ({ ...c, image: fn(c.image) })), products: content.products.map(p => ({ ...p, images: p.images.map(fn), detailImages: p.detailImages.map(fn) })) };
}
export function published(content: SiteContent): SiteContent {
  return { ...content, categories: [...content.categories].sort((a,b) => a.order-b.order), products: content.products.filter(p => p.status === 'published').sort((a,b) => a.order-b.order) };
}
export function placeholder(id: string): Media { return { id, src: null, label: 'IMAGE', alt: { ko: '', en: '' }, tone: 'stone', fit: 'contain' }; }

