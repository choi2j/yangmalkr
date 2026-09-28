'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { Media as MediaData } from '@/lib/content/types';
import { useLanguage } from './language-provider';
import { Media } from './media';

export function HeroCarousel({ images }: { images: MediaData[] }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const multiple = images.length > 1;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!multiple || paused || hovered) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [images.length, multiple, paused, hovered]);

  function move(direction: number) {
    setPaused(true);
    setActive((index) => (index + direction + images.length) % images.length);
  }

  return (
    // Passive events pause the carousel; its buttons handle keyboard interaction.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      className="hero-visual"
      aria-roledescription={multiple ? t('슬라이드 쇼', 'carousel') : undefined}
      aria-label={t('메인 이미지', 'Featured images')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setPaused(true)}
    >
      {images.map((image, index) => (
        <div
          key={`${image.id}-${index}`}
          className={`hero-slide ${index === active ? 'is-active' : ''}`}
          aria-hidden={index !== active}
          // Carousel slides use named ARIA groups, not form fieldsets.
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
          role="group"
          aria-roledescription={t('슬라이드', 'slide')}
          aria-label={`${index + 1} / ${images.length}`}
        >
          <Media asset={image} slot="hero" priority={index === 0} />
        </div>
      ))}
      {multiple && (
        <div className="hero-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label={t('이전 이미지', 'Previous image')}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <span aria-live={paused ? 'polite' : 'off'} aria-atomic="true">{active + 1} / {images.length}</span>
          <button type="button" onClick={() => move(1)} aria-label={t('다음 이미지', 'Next image')}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button type="button" onPointerDown={(event) => event.preventDefault()} onClick={() => setPaused((value) => !value)} aria-label={paused ? t('자동 재생', 'Start slideshow') : t('자동 재생 일시정지', 'Pause slideshow')}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        </div>
      )}
    </section>
  );
}
