import test from 'node:test';
import assert from 'node:assert/strict';
import { seedContent } from '../lib/content/seed.ts';
import { mapMedia, parseContent, placeholder } from '../lib/content/schema.ts';

void test('legacy heroes and ordered slides survive validation and media publishing', () => {
  const legacy = JSON.parse(JSON.stringify(seedContent));
  delete legacy.home.heroSlides;
  const content = parseContent(legacy);
  assert.deepEqual(content.home.heroSlides, []);
  assert.deepEqual(content.home.hero, legacy.home.hero);

  content.home.heroSlides = ['second', 'third'].map((id, index) => ({
    ...placeholder(id), src: `/media/${String(index + 1).repeat(64)}.webp`,
  }));
  const parsed = parseContent(content);
  const mapped = mapMedia(parsed, image => ({
    ...image, src: image.src?.replace('/media/', 'https://example.com/media/') ?? null,
  }));
  assert.deepEqual(mapped.home.heroSlides.map(image => image.id), ['second', 'third']);
  assert.ok(mapped.home.heroSlides.every(image => image.src?.startsWith('https://')));
  assert.ok(parsed.home.heroSlides.every(image => image.src?.startsWith('/media/')));
  assert.deepEqual(parseContent(mapped).home.heroSlides, mapped.home.heroSlides);

  content.home.heroSlides = Array.from({ length: 19 }, (_, index) => placeholder(`slide-${index}`));
  assert.equal(parseContent(content).home.heroSlides.length, 19);
  content.home.heroSlides.push(placeholder('too-many'));
  assert.throws(() => parseContent(content));
  content.home.heroSlides = [{ ...placeholder('unsafe'), src: 'javascript:alert(1)' }];
  assert.throws(() => parseContent(content));
});
