'use client';
import Link from 'next/link';
import type { SiteContent } from '@/lib/content/types';
import { useLanguage } from './language-provider';
import { HeroCarousel } from './hero-carousel';
import { ProductCard } from './product-card';
import { StoreBanner, TextLink } from './site-shell';

export function HomePage({ content }: { content: SiteContent }) {
  const { locale, t, pick } = useLanguage();
  const headline = content.home.headline[locale];
  const featured = content.products
    .filter((product) => product.featured)
    .slice(0, 4);
  const productCovers = content.products
    .map((product) => product.images[0])
    .filter((image) => image?.src);
  const heroImages = [content.home.hero, ...content.home.heroSlides].filter(
    (image) => image.src,
  );
  if (!heroImages.length) heroImages.push(productCovers[0] ?? content.home.hero);
  return (
    <main id="main">
      <section className="container home-hero">
        <div className="hero-copy">
          <p className="eyebrow">GOOD SOCKS. BETTER DAYS.</p>
          <h1>
            {headline[0]}
            <br />
            {headline[1]}
            <br />
            <span>{headline[2]}</span>
          </h1>
          <p className="hero-description">{pick(content.home.description)}</p>
          <Link className="button-link" href="/products">
            {t('나에게 맞는 양말 찾기', 'Find your everyday pair')}
          </Link>
        </div>
        <HeroCarousel
          key={JSON.stringify(heroImages.map((image) => [image.id, image.src]))}
          images={heroImages}
        />
      </section>
      <section className="container section collection-section">
        <div className="section-heading">
          <div>
            <h2>
              {t('어떤 하루를 보내시나요?', 'What does your day look like?')}
            </h2>
          </div>
        </div>
        <nav
          className="collection-grid"
          aria-label={t('양말 카테고리', 'Sock categories')}
        >
          {content.categories.map((category) => (
            <Link
              className="collection-card"
              key={category.id}
              href={`/product/${category.slug}`}
            >
              <div className="collection-copy">
                <h3>{pick(category.name)}</h3>
                <p>{pick(category.subtitle)}</p>
              </div>
            </Link>
          ))}
        </nav>
      </section>
      {featured.length > 0 && (
        <section className="section featured-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2>
                  {t('매일 함께하고 싶은 양말', 'Good pairs for better days')}
                </h2>
              </div>
              <TextLink href="/products">
                {t('모든 상품 보기', 'Explore all socks')}
              </TextLink>
            </div>
            <div className="product-grid">
              {featured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  content={content}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="container section story-section">
        <div className="story-heading">
          <p className="eyebrow">NINESOCKS</p>
          <h2>
            {t('양말 하나에도,', 'A simple essential.')}
            <br />
            {t('우리만의 기준이 있습니다.', 'A thoughtful approach.')}
          </h2>
        </div>
        <div className="story-copy">
          <p>
            {t(
              '눈에 잘 띄지 않아도, 하루 종일 함께하는 것.\n우리는 양말이 만드는 작은 차이를 믿습니다.',
              'Often unnoticed, always with you.\nWe believe in the small difference a good pair can make.',
            )}
          </p>
          <p>
            {t(
              '2001년부터 쌓아온 양말 산업의 경험을 바탕으로, 2019년 나인양말을 시작했습니다. 익숙한 일상에 더 나은 착용감을 전하기 위해 소재와 디테일을 살핍니다.',
              'With experience in the sock industry since 2001, we founded NINESOCKS in 2019. We pay attention to materials and details to bring comfort to familiar routines.',
            )}
          </p>
          <TextLink href="/about">
            {t('나인양말 이야기', 'The NINESOCKS story')}
          </TextLink>
        </div>
      </section>
      <StoreBanner url={content.settings.storeUrl} />
    </main>
  );
}
