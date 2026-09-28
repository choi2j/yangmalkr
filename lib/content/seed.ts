import type { Localized, Media, Product, SiteContent } from './types.ts';

const l = (ko: string, en: string): Localized => ({ ko, en });
const media = (
  id: string,
  label: string,
  tone: Media['tone'],
  ko: string,
  en: string,
): Media => ({
  id,
  src: null,
  label,
  tone,
  alt: l(ko, en),
  fit: 'contain',
});

const categories: SiteContent['categories'] = [
  {
    id: 'cat-hiking',
    slug: 'hiking',
    name: l('등산양말', 'Hiking'),
    subtitle: l('더 멀리 걷는 하루', 'For the longer trail'),
    description: l(
      '새로운 길 위에서도 발끝은 편안하게. 아웃도어를 위한 기능성 라인입니다.',
      'Comfort for every new trail. Discover our functional outdoor collection.',
    ),
    image: media(
      'category-hiking',
      'OUTDOOR',
      'sage',
      '등산양말 컬렉션',
      'Hiking socks collection',
    ),
    order: 0,
  },
  {
    id: 'cat-student',
    slug: 'student',
    name: l('학생양말', 'Student'),
    subtitle: l('매일의 든든한 기본', 'An everyday essential'),
    description: l(
      '바쁜 아침에도 고민 없이. 매일 손이 가는 베이직 라인입니다.',
      'One less thing to think about on busy mornings. Everyday basics to reach for again and again.',
    ),
    image: media(
      'category-student',
      'DAILY',
      'sand',
      '학생양말 컬렉션',
      'Student socks collection',
    ),
    order: 1,
  },
  {
    id: 'cat-men',
    slug: 'men',
    name: l('남성양말', 'Men'),
    subtitle: l('단정함을 완성하는 디테일', 'The finishing detail'),
    description: l(
      '출근길부터 주말까지. 일상에 자연스럽게 어울리는 단정한 라인입니다.',
      'From the workday to the weekend. Clean, understated socks for everyday life.',
    ),
    image: media(
      'category-men',
      'ESSENTIAL',
      'stone',
      '남성양말 컬렉션',
      'Men’s socks collection',
    ),
    order: 2,
  },
  {
    id: 'cat-women',
    slug: 'women',
    name: l('여성양말', 'Women'),
    subtitle: l('오늘의 룩에 작은 포인트', 'A little personality'),
    description: l(
      '좋아하는 옷에 더하는 작은 즐거움. 색과 패턴으로 만나는 데일리 라인입니다.',
      'A little joy to pair with your favorite clothes. Discover everyday colors and patterns.',
    ),
    image: media(
      'category-women',
      'COLOR & MOOD',
      'rose',
      '여성양말 컬렉션',
      'Women’s socks collection',
    ),
    order: 3,
  },
];

const products: Product[] = [
  {
    id: 'prod-trekking-cushion-crew',
    slug: 'trekking-cushion-crew',
    categoryId: 'cat-hiking',
    name: l('스페셜쿨트레킹양말', 'Special Cool Trekking Socks'),
    summary: l(
      '산행의 시작부터 마지막 걸음까지',
      'Comfort from the first step to the last',
    ),
    description: l(
      '장시간 걷는 날을 생각한 쿠셔닝과 통기성 설계. 발바닥과 발목, 발등의 서로 다른 움직임을 고려한 등산양말입니다.',
      'Cushioning and breathable knitting designed for long days on your feet, with different knit zones for the sole, ankle, and instep.',
    ),
    features: [
      l('쿠셔닝', 'Cushioning'),
      l('통기성', 'Breathable knit'),
      l('아웃도어', 'Outdoor'),
    ],
    price: 5900,
    salePrice: 4900,
    shippingFee: null,
    purchaseUrl: 'https://smartstore.naver.com/yangmal_socks',
    status: 'published',
    availability: 'available',
    featured: true,
    order: 0,
    images: [
      media(
        'hiking-front',
        'PRODUCT 01',
        'sage',
        '등산양말 대표 이미지',
        'Hiking socks product image',
      ),
      media(
        'hiking-wear',
        'ON THE TRAIL',
        'stone',
        '등산양말 착용 이미지',
        'Hiking socks in use',
      ),
      media(
        'hiking-texture',
        'KNIT DETAIL',
        'sand',
        '등산양말 소재 확대',
        'Hiking socks knit detail',
      ),
    ],
    detailImages: [
      media(
        'hiking-detail',
        'PRODUCT DETAIL',
        'sage',
        '등산양말 상세 이미지',
        'Hiking socks detail image',
      ),
    ],
  },
  {
    id: 'prod-daily-basic-3pack',
    slug: 'daily-basic-3pack',
    categoryId: 'cat-student',
    name: l('데일리 베이직 3팩', 'Daily Basic 3-Pack'),
    summary: l(
      '매일 꺼내 신는, 가장 편한 기본',
      'The essentials you reach for every day',
    ),
    description: l(
      '질리지 않는 기본 컬러와 부드러운 면 혼방의 데일리 양말. 활동량이 많은 학생의 하루에 자연스럽게 어울립니다.',
      'Daily socks in timeless colors and a soft cotton blend, made to fit naturally into an active student’s day.',
    ),
    features: [
      l('베이직', 'Everyday basic'),
      l('3팩 구성', '3-pack'),
      l('면 혼방', 'Cotton blend'),
    ],
    price: null,
    salePrice: null,
    shippingFee: null,
    purchaseUrl: null,
    status: 'published',
    availability: 'coming-soon',
    featured: true,
    order: 1,
    images: [
      media(
        'student-front',
        'PRODUCT 02',
        'sand',
        '학생양말 대표 이미지',
        'Student socks product image',
      ),
      media(
        'student-wear',
        'EVERYDAY FIT',
        'stone',
        '학생양말 착용 이미지',
        'Student socks in use',
      ),
    ],
    detailImages: [
      media(
        'student-detail',
        'PRODUCT DETAIL',
        'sand',
        '학생양말 상세 이미지',
        'Student socks detail image',
      ),
    ],
  },
  {
    id: 'prod-daily-gentleman',
    slug: 'daily-gentleman',
    categoryId: 'cat-men',
    name: l('데일리신사중목양말', 'Daily Gentleman Mid-Calf Socks'),
    summary: l('과하지 않게, 단정한 하루', 'A considered detail for every day'),
    description: l(
      '슈트와 캐주얼 사이, 어느 쪽에도 자연스러운 중목 양말. 편안하게 잡아주는 밴드와 깔끔한 핏으로 일상의 기본을 채웁니다.',
      'Mid-calf socks that feel at home with tailoring or casual wear. A comfortable band and clean fit complete your everyday wardrobe.',
    ),
    features: [
      l('중목', 'Mid-calf'),
      l('비즈니스', 'Business'),
      l('데일리', 'Everyday'),
    ],
    price: 3500,
    salePrice: 2500,
    shippingFee: 3000,
    purchaseUrl: null,
    status: 'published',
    availability: 'coming-soon',
    featured: true,
    order: 2,
    images: [
      media(
        'men-front',
        'PRODUCT 03',
        'stone',
        '남성양말 대표 이미지',
        'Men’s socks product image',
      ),
      media(
        'men-wear',
        'EVERYDAY FIT',
        'ink',
        '남성양말 착용 이미지',
        'Men’s socks in use',
      ),
      media(
        'men-texture',
        'KNIT DETAIL',
        'sand',
        '남성양말 소재 확대',
        'Men’s socks knit detail',
      ),
    ],
    detailImages: [
      media(
        'men-detail',
        'PRODUCT DETAIL',
        'stone',
        '남성양말 상세 이미지',
        'Men’s socks detail image',
      ),
    ],
  },
  {
    id: 'prod-pattern-fashion',
    slug: 'pattern-fashion',
    categoryId: 'cat-women',
    name: l('패턴 패션 삭스', 'Pattern Fashion Socks'),
    summary: l(
      '작은 포인트로 달라지는 기분',
      'A little detail, a brighter mood',
    ),
    description: l(
      '다양한 컬러와 패턴으로 일상에 포인트를 더하는 양말. 얇고 부드러운 원사로 가볍게 즐기는 데일리 스타일입니다.',
      'Socks that bring color and pattern to your everyday outfits. A light, soft knit for easy everyday styling.',
    ),
    features: [
      l('패턴', 'Pattern'),
      l('부드러운 촉감', 'Soft feel'),
      l('데일리', 'Everyday'),
    ],
    price: 3500,
    salePrice: 2500,
    shippingFee: 3000,
    purchaseUrl: null,
    status: 'published',
    availability: 'coming-soon',
    featured: true,
    order: 3,
    images: [
      media(
        'women-front',
        'PRODUCT 04',
        'rose',
        '여성양말 대표 이미지',
        'Women’s socks product image',
      ),
      media(
        'women-wear',
        'COLOR & MOOD',
        'sand',
        '여성양말 착용 이미지',
        'Women’s socks in use',
      ),
    ],
    detailImages: [
      media(
        'women-detail',
        'PRODUCT DETAIL',
        'rose',
        '여성양말 상세 이미지',
        'Women’s socks detail image',
      ),
    ],
  },
];

export const seedContent: SiteContent = {
  schemaVersion: 1,
  settings: {
    storeUrl: 'https://smartstore.naver.com/yangmal_socks',
    businessEmail: 'ninesocks@naver.com',
    phone: '031-543-4193',
    fax: '031-543-4249',
    address: l(
      '경기도 포천시 소흘읍 한성길 106',
      '106 Hanseong-gil, Soheul-eup, Pocheon-si, Gyeonggi-do, Korea',
    ),
  },
  home: {
    headline: {
      ko: ['좋은 하루는,', '발끝에서', '시작되니까.'],
      en: ['Good socks.', 'Better days.', 'Every step.'],
    },
    description: l(
      '익숙한 일상부터 새로운 발걸음까지.\n당신의 하루에 꼭 맞는 편안함을 만듭니다.',
      'From familiar routines to new adventures.\nComfort made for the way you spend your day.',
    ),
    hero: {
      ...media(
        'home-hero',
        'LIFESTYLE IMAGE',
        'sand',
        'NINESOCKS 라이프스타일 이미지',
        'NINESOCKS lifestyle image',
      ),
      fit: 'cover',
    },
    heroSlides: [],
    story: {
      ...media(
        'home-story',
        'MATERIAL & CRAFT',
        'stone',
        '양말 소재와 제작 과정 이미지',
        'Sock materials and craftsmanship',
      ),
      fit: 'cover',
    },
  },
  categories,
  products,
};
