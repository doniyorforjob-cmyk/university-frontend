# 📁 Loyiha Strukturasi

> **Namangan Davlat Texnika Universiteti** rasmiy veb-sayti frontend qismi  
> **Oxirgi yangilanish:** 2025-12-19  
> **Versiya:** 3.0

---

## 🎯 Umumiy Ko'rinish

Bu loyiha zamonaviy React + TypeScript yordamida qurilgan SPA (Single Page Application) hisoblanadi. Loyiha modulli va miqyoslanadigan arxitekturaga ega.

```
university-frontend/
├── public/                      # Statik fayllar
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/                         # Asosiy manba kodlar
│   ├── api/                     # API chaqiruvlar (mock va http)
│   ├── components/              # React komponentlar
│   ├── config/                  # Konfiguratsiya fayllar
│   ├── data/                    # Statik ma'lumotlar
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility kutubxonalar
│   ├── pages/                   # Sahifa komponentlari
│   ├── providers/               # Context providers
│   ├── services/                # Business logic layer
│   ├── store/                   # Global state management (Zustand)
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Helper funksiyalar
│   ├── App.tsx                  # Asosiy App komponenti
│   ├── index.tsx                # Entry point
│   ├── index.css                # Global styles
│   └── i18n.ts                  # Internatsionalizatsiya konfiguratsiyasi
├── .env                         # Environment variables
├── .eslintrc.js                 # ESLint konfiguratsiyasi
├── components.json              # Shadcn/ui konfiguratsiyasi
├── craco.config.js              # CRACO konfiguratsiyasi
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind CSS konfiguratsiyasi
├── tsconfig.json                # TypeScript konfiguratsiyasi
├── PROJECT_STRUCTURE.md         # Bu fayl
├── HOME_PAGE_ARCHITECTURE.md    # Home sahifa arxitekturasi
├── NEWS_ANNOUNCEMENTS_TEMPLATES.md  # Yangiliklar/E'lonlar shablonlari
├── RESPONSIVE_SYSTEM.md         # Responsive sistema hujjati
└── SHADCN_USAGE.md              # Shadcn/ui ishlatish qo'llanmasi
```

---

## 📦 **src/api/** - API Layer

API layer ikki turga bo'linadi: **mock** (rivojlantirish uchun) va **http** (real API uchun).

```
api/
├── client.ts              # Axios client konfiguratsiyasi
├── http/                  # Real HTTP API calls
│   ├── activities.http.ts
│   ├── admission.http.ts
│   ├── announcement.http.ts
│   ├── department.http.ts
│   ├── ecoActiveStudents.http.ts
│   ├── faculties.http.ts
│   ├── faq.http.ts
│   ├── footer.http.ts
│   ├── home.http.ts
│   ├── informationServices.http.ts
│   ├── interactiveServices.http.ts
│   ├── media.http.ts
│   ├── navbar.http.ts
│   ├── organizationalStructure.http.ts
│   ├── posts.http.ts
│   ├── settings.http.ts
│   ├── stats.http.ts
│   ├── structure.http.ts
│   ├── universityContent.http.ts
│   └── yashilUniversitet.http.ts
└── mock/                  # Mock data (development)
    ├── activities.mock.ts
    ├── admission.mock.ts
    ├── announcement.mock.ts
    ├── department.mock.ts
    ├── ecoActiveStudents.mock.ts
    ├── faculties.mock.ts
    ├── faq.mock.ts
    ├── footer.mock.ts
    ├── home.mock.ts
    ├── informationServices.mock.ts
    ├── interactiveServices.mock.ts
    ├── media.mock.ts
    ├── navbar.mock.ts
    ├── organizationalStructure.mock.ts
    ├── posts.mock.ts
    ├── settings.mock.ts
    ├── stats.mock.ts
    ├── structure.mock.ts
    ├── universityContent.mock.ts
    └── yashilUniversitet.mock.ts
```

### Ishlatish:

```typescript
import { getMediaArticles } from '@/api/http/media.http';
import { getMediaArticles as getMockMediaArticles } from '@/api/mock/media.mock';
```

**Qulayliklar:**
- ✅ Mock/Real API o'rtasida oson o'tish (.env orqali)
- ✅ Har bir API uchun alohida fayl
- ✅ Axios client markazlashtirilgan

---

## 🧩 **src/components/** - Komponentlar

Komponentlar 7 ta asosiy kategoriyaga bo'linadi:

```
components/
├── Layout/                # Asosiy layout komponentlari (9 fayl)
│   ├── Footer/
│   ├── Header/
│   └── Navbar/
├── blocks/                # Content blocks (50 fayl)
│   ├── activities/       # Faoliyatlar blocklari
│   ├── data/             # Ma'lumot blocklari
│   ├── integration/      # Integratsiya blocklari
│   ├── interactive/      # Interaktiv blocklari
│   ├── layout/           # Layout blocklari
│   ├── media/            # Media blocklari
│   ├── special/          # Maxsus blocklari
│   └── text/             # Matn blocklari
├── features/              # Feature-specific komponentlar (7 papka)
│   ├── announcements/
│   ├── contact/
│   ├── faq/
│   ├── news/
│   ├── organizational-structure/
│   ├── stats/
│   └── user/
├── providers/             # Context providers (3 fayl)
│   ├── ResponsiveProvider.tsx
│   ├── SettingsProvider.tsx
│   └── index.tsx
├── shared/                # Umumiy komponentlar (22 fayl)
│   ├── Banner.tsx
│   ├── Breadcrumbs.tsx
│   ├── CalendarHeader.tsx
│   ├── Container.tsx
│   ├── ContentBuilder.tsx
│   ├── DownloadLink.tsx
│   ├── GenericPageSkeleton.tsx
│   ├── LoadingSpinner.tsx
│   ├── MainLayout.tsx
│   ├── OptimizedImage.tsx
│   ├── PageSkeleton.tsx
│   ├── PageTemplate.tsx
│   ├── PrefetchLink.tsx
│   ├── Sidebar.tsx
│   ├── error-boundary.tsx
│   ├── scroll-to-top.tsx
│   └── cards/            # Card komponentlari
├── templates/             # Sahifa shablonlari (3 fayl)
│   ├── GlobalLayout.tsx
│   ├── NewsLayout.tsx
│   └── index.tsx
└── ui/                    # Shadcn/ui komponentlar (14 fayl)
    ├── alert.tsx
    ├── aspect-ratio.tsx
    ├── badge.tsx
    ├── breadcrumb.tsx
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── label.tsx
    ├── pagination.tsx
    ├── progress.tsx
    ├── progressive-carousel.tsx
    ├── skeleton.tsx
    └── textarea.tsx
```

### Komponent Kategoriyalari:

#### 1. **Layout** - Layout Komponentlari
Layout komponentlari sahifaning asosiy tuzilishini tashkil qiladi.

```tsx
import { Header, Footer, Navbar } from '@/components/Layout';
```

#### 2. **shared** - Umumiy Komponentlar
Loyiha bo'ylab qayta ishlatiladigan komponentlar.

```tsx
import { Banner, Breadcrumbs, Container, Sidebar } from '@/components/shared';
```

#### 3. **ui** - UI Primitives (Shadcn/ui)
Shadcn/ui kutubxonasidan olingan UI komponentlar.

```tsx
import { Button, Input, Card, Badge } from '@/components/ui';
```

#### 4. **blocks** - Content Blocks
Sahifa tarkibini tashkil qiluvchi modulli bloklar. Bu bloklar CMS orqali boshqariladigan dinamik kontent uchun ishlatiladi.

```tsx
import { HeroBlock, StatsBlock, NewsBlock } from '@/components/blocks';
```

#### 5. **features** - Feature-specific
Maxsus funksiyalar uchun komponentlar.

```tsx
import { NewsCard } from '@/components/features/news';
import { ContactForm } from '@/components/features/contact';
```

#### 6. **templates** - Sahifa Shablonlari
Sahifalar uchun umumiy layout shablonlari.

```tsx
import { GlobalLayout, NewsLayout } from '@/components/templates';
```

#### 7. **providers** - Context Providers
React Context API bilan global state boshqarish.

```tsx
import { ResponsiveProvider, SettingsProvider } from '@/components/providers';
```

---

## ⚙️ **src/config/** - Konfiguratsiya

Loyihadagi barcha konfiguratsiya fayllar markazlashgan.

```
config/
├── constants.ts        # Global konstantalar
├── env.ts             # Environment variables
├── index.ts           # Export point
├── routes.ts          # Route yo'llari
└── routesConfig.tsx   # Route konfiguratsiyasi
```

### constants.ts - Global Konstantalar

```typescript
import { APP_NAME, COLORS, ITEMS_PER_PAGE } from '@/config/constants';
```

**Nima bor:**
- Loyiha ma'lumotlari (`APP_NAME`, `APP_DESCRIPTION`)
- API konfiguratsiyasi (`API_BASE_URL`, `API_TIMEOUT`)
- Pagination (`ITEMS_PER_PAGE`)
- Ranglar (`COLORS`)
- Breakpoints (`BREAKPOINTS`)
- Tillar (`LANGUAGES`)
- Validation qoidalari (`VALIDATION`)
- Cache sozlamalari (`CACHE_KEYS`, `CACHE_TIME`)

### routes.ts - Route Yo'llari

```typescript
import { ROUTES, createRoute } from '@/config/routes';

// Ishlatish
<Link to={ROUTES.NEWS}>Yangiliklar</Link>
<Link to={createRoute.newsDetail('slug-123')}>Yangilik</Link>
```

### env.ts - Environment Variables

```typescript
import { ENV } from '@/config/env';

if (ENV.IS_DEV) {
  console.log('Development mode');
}
```

---

## 🪝 **src/hooks/** - Custom Hooks

Custom React hooks loyiha bo'ylab qayta ishlatiladigan logic uchun.

```
hooks/
├── useCachedApi.ts                    # Cached API hooks
├── useClickOutside.tsx                # Click outside detector
├── useFAQData.ts                      # FAQ ma'lumotlari
├── useFooterData.ts                   # Footer ma'lumotlari
├── useImagePreloader.ts               # Rasm preloader
├── useInteractiveServicesData.ts      # Interaktiv xizmatlar
├── useNewsData.ts                     # Yangiliklar
├── useResponsive.ts                   # Responsive breakpoints
├── useStandardPage.ts                 # Standard sahifa logic
├── useStatsData.ts                    # Statistika
├── useStructureData.ts                # Struktura
└── useWebPSupport.ts                  # WebP format support
```

### Ishlatish:

```typescript
import { useNewsData } from '@/hooks/useNewsData';
import { useResponsive } from '@/hooks/useResponsive';

const NewsPage = () => {
  const { data, loading, error } = useNewsData();
  const { isMobile, isTablet } = useResponsive();
  
  // ...
};
```

---

## 📄 **src/pages/** - Sahifalar

Har bir sahifa alohida papkada tashkil qilingan.

```
pages/
├── Home/                    # Bosh sahifa
├── News/                    # Yangiliklar
├── NewsDetail/              # Yangilik tafsiloti
├── Announcements/           # E'lonlar
├── MediaAboutUs/            # OAV biz haqimizda
├── Contact/                 # Aloqa
├── University/              # Universitet haqida
├── InformationServices/     # Axborot xizmati
├── OrganizationalStructure/ # Tashkiliy tuzilma
├── Admission/               # Qabul
├── Activities/              # Faoliyatlar
├── EcoActiveStudents/       # Ekologik faol talabalar
├── YashilUniversitet/       # Yashil universitet
├── PhotoDetail/             # Foto tafsiloti
└── Appeals/                 # Murojaat
```

### Sahifa Strukturasi:

Har bir sahifa quyidagi strukturaga ega:

```
MediaAboutUs/
├── index.tsx              # Asosiy sahifa komponenti
└── components/            # Sahifaga xos komponentlar
    └── MediaMentionCard.tsx
```

---

## 🔧 **src/services/** - Business Logic

Services layer API va UI o'rtasida vositachi bo'lib, business logicni tashkil qiladi.

```
services/
├── activitiesService.ts
├── admissionService.ts
├── announcementService.ts
├── departmentService.ts
├── ecoActiveStudentsService.ts
├── facultiesService.ts
├── faqService.ts
├── footerService.ts
├── homeService.ts
├── informationServicesService.ts
├── interactiveServicesService.ts
├── mediaService.ts                    # Mock/HTTP switcher
├── navbarService.ts
├── organizationalStructureService.ts
├── postService.ts
├── settingsService.ts
├── statsService.ts
├── structureService.ts
├── universityContentService.ts
└── yashilUniversitetService.ts
```

### Service Pattern:

```typescript
// services/mediaService.ts
import { getMediaArticles as mockGetMediaArticles } from '@/api/mock/media.mock';
import { getMediaArticles as httpGetMediaArticles } from '@/api/http/media.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const getMediaArticles = useMock ? mockGetMediaArticles : httpGetMediaArticles;
```

**Afzalliklar:**
- ✅ API chaqiruvlari markazlashtirilgan
- ✅ Mock/Real o'rtasida oson o'tish
- ✅ Business logic UI'dan ajratilgan

---

## 📊 **src/types/** - TypeScript Types

Barcha TypeScript type definitions bir joyda.

```
types/
├── activities.types.ts
├── activity.types.ts
├── announcement.types.ts
├── appeal.types.ts
├── department.types.ts
├── faculty.types.ts
├── faq.types.ts
├── footer.types.ts
├── home.types.ts
├── informationServices.types.ts
├── media.types.ts
├── navbar.types.ts
├── organizationalStructure.types.ts
├── post.types.ts
├── react-icons.d.ts         # React Icons type declarations
├── responsive.types.ts
├── service.types.ts
├── settings.types.ts
├── stat.types.ts
├── structure.types.ts
└── university.types.ts
```

### Ishlatish:

```typescript
import { MediaArticle } from '@/types/media.types';
import { Post } from '@/types/post.types';
import { Faculty } from '@/types/faculty.types';
```

---

## 🛠️ **src/utils/** - Utility Funksiyalar

Yordamchi funksiyalar loyiha bo'ylab qayta ishlatiladigan logic uchun.

```
utils/
├── cacheManager.ts              # Cache boshqarish
├── format.ts                    # Formatlash (sana, raqam, matn)
├── helpers.ts                   # Yordamchi funksiyalar
├── imageOptimization.ts         # Rasm optimizatsiyasi
├── index.ts                     # Export point
├── performance.ts               # Performance monitoring
├── performanceOptimization.ts   # Performance optimallashtirish
├── preload.ts                   # Resource preloading
├── responsive.ts                # Responsive utilities
├── serviceWorker.ts             # Service Worker
├── validation.ts                # Validatsiya funksiyalar
└── validationSchemas.ts         # Validation schemas
```

### format.ts - Formatlash

```typescript
import { formatDate, formatNumber, truncateText } from '@/utils/format';

formatDate(new Date()); // "19 Dekabr 2025"
formatNumber(1000); // "1,000"
truncateText('Uzun matn...', 10); // "Uzun ma..."
```

**Funksiyalar:**
- `formatDate()` - Sana formatlash
- `formatDateTime()` - Sana va vaqt
- `formatRelativeTime()` - "2 soat oldin"
- `formatNumber()` - Raqam formatlash
- `formatCurrency()` - Pul
- `truncateText()` - Matnni qisqartirish
- `createSlug()` - URL slug yaratish

### validation.ts - Validatsiya

```typescript
import { isValidEmail, isValidPhone, VALIDATION_MESSAGES } from '@/utils/validation';

if (!isValidEmail(email)) {
  alert(VALIDATION_MESSAGES.email);
}
```

**Funksiyalar:**
- `isValidEmail()` - Email tekshirish
- `isValidPhone()` - Telefon raqam
- `isValidPassword()` - Parol
- `isValidUrl()` - URL
- `isNotEmpty()` - Bo'sh emasligini tekshirish

### helpers.ts - Yordamchi Funksiyalar

```typescript
import { debounce, chunk, copyToClipboard } from '@/utils/helpers';

const handleSearch = debounce((query) => {
  // Search logic
}, 300);
```

**Funksiyalar:**
- `debounce()` - Debounce
- `throttle()` - Throttle
- `sleep()` - Async sleep
- `chunk()` - Array'ni bo'lish
- `unique()` - Dublikatlarni olib tashlash
- `deepClone()` - Chuqur nusxa
- `buildQueryString()` - Query string yaratish
- `setLocalStorage()` / `getLocalStorage()` - LocalStorage

---

## 🗄️ **src/store/** - State Management

Global state Zustand kutubxonasi bilan boshqariladi.

```
store/
├── fontSizeStore.ts      # Shrift hajmi state
├── settingsStore.ts      # Sozlamalar state
└── themeStore.ts         # Tema state
```

### Ishlatish:

```typescript
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';

const MyComponent = () => {
  const { fontSize, setFontSize } = useFontSizeStore();
  const { theme, setTheme } = useThemeStore();
  
  // ...
};
```

---

## 🎨 **src/lib/** - Library Utilities

Kutubxona utility funksiyalari.

```
lib/
└── utils.ts    # cn() funksiyasi
```

### cn() - Class Name Utility

```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-class', isActive && 'active-class')} />
```

**Maqsad:** Tailwind klasslarni birlashtirish va konfliktlarni hal qilish.

---

## 🌍 **Internatsionalizatsiya (i18n)**

Loyiha ko'p tillilikni qo'llab-quvvatlaydi.

```
public/locales/
├── uz/
│   └── translation.json
├── ru/
│   └── translation.json
└── en/
    └── translation.json
```

### Ishlatish:

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();
  
  return <h1>{t('welcome')}</h1>;
};
```

---

## 📚 **Qanday Ishlatish**

### 1. Komponentlar

```tsx
// UI komponentlar
import { Button, Input, Card } from '@/components/ui';

// Shared komponentlar
import { Banner, Breadcrumbs } from '@/components/shared';

// Layout komponentlar
import { Header, Footer } from '@/components/Layout';
```

### 2. Config

```tsx
import { ROUTES, COLORS, API_BASE_URL } from '@/config';
```

### 3. Utils

```tsx
import { formatDate, isValidEmail, debounce } from '@/utils';
```

### 4. Hooks

```tsx
import { useNewsData, useResponsive } from '@/hooks';
```

### 5. Services

```tsx
import { getMediaArticles } from '@/services/mediaService';
```

### 6. Types

```tsx
import { MediaArticle, Post } from '@/types';
```

---

## 🚀 **Texnologiyalar**

### Core
- ⚛️ **React 18.2.0** - UI kutubxonasi
- 📘 **TypeScript 4.9.5** - Type safety
- 🎨 **Tailwind CSS 3.4.13** - Utility-first CSS framework
- 🔄 **React Router 6.23.1** - Routing

### State Management
- 📦 **Zustand 4.5.2** - Global state
- 🔄 **React Query 4.42.0** - Server state

### UI Components
- 🧩 **Shadcn/ui** - UI component library
- 🎭 **Framer Motion 12.23.24** - Animatsiyalar
- 🎨 **Lucide React** - Ikonlar

### Utilities
- 🌐 **i18next 22.5.1** - Internatsionalizatsiya
- 📡 **Axios 1.7.2** - HTTP client
- 📍 **Leaflet 1.9.4** - Xaritalar
- 🔥 **React Hot Toast 2.6.0** - Bildirishnomalar

### Development
- ⚙️ **CRACO 7.1.0** - Create React App Configuration Override
- 📦 **Webpack Bundle Analyzer** - Bundle tahlili

---

## 🎯 **Best Practices**

### 1. ✅ Import'larni @ alias bilan yozing

```tsx
import { Button } from '@/components/ui';          // ✅ To'g'ri
import Button from '../../components/ui/button';   // ❌ Noto'g'ri
```

### 2. ✅ Konstantalarni config dan oling

```tsx
import { ROUTES } from '@/config';    // ✅ To'g'ri
const route = '/news';                // ❌ Noto'g'ri
```

### 3. ✅ Utility funksiyalarni qayta yozmang

```tsx
import { formatDate } from '@/utils';    // ✅ To'g'ri
const formatDate = (date) => { ... }     // ❌ Noto'g'ri
```

### 4. ✅ Service layer ishlatish

```tsx
import { getMediaArticles } from '@/services/mediaService';  // ✅ To'g'ri
import { getMediaArticles } from '@/api/http/media.http';    // ❌ Noto'g'ri
```

### 5. ✅ Type safety

```tsx
import { MediaArticle } from '@/types/media.types';

const articles: MediaArticle[] = [];  // ✅ To'g'ri
const articles = [];                  // ❌ Noto'g'ri
```

### 6. ✅ Error Boundary ishlatish

```tsx
import { ErrorBoundary } from '@/components/shared';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

---

## 🔧 **Environment Variables**

`.env` faylida quyidagi o'zgaruvchilar mavjud:

```bash
# API Configuration
REACT_APP_API_URL=http://your-api-url.com/api
REACT_APP_USE_MOCK_API=true

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_CHAT=false

# Other
NODE_ENV=development
```

---

## 📖 **Qo'shimcha Hujjatlar**

Loyihada qo'shimcha arxitektura hujjatlari mavjud:

- 📄 **HOME_PAGE_ARCHITECTURE.md** - Bosh sahifa arxitekturasi
- 📄 **NEWS_ANNOUNCEMENTS_TEMPLATES.md** - Yangiliklar va e'lonlar shablonlari
- 📄 **RESPONSIVE_SYSTEM.md** - Responsive sistema hujjati
- 📄 **SHADCN_USAGE.md** - Shadcn/ui ishlatish qo'llanmasi

---

## 📞 **Yordam**

Agar savollaringiz bo'lsa:
- 📧 Email: dev@namdtu.uz
- 🌐 Website: https://namdtu.uz
- 📱 Telegram: @namdtu_official

---

**Muallif:** NAMDTU Development Team  
**Oxirgi yangilanish:** 2025-12-19  
**Versiya:** 3.0  
**Litsenziya:** Proprietary
