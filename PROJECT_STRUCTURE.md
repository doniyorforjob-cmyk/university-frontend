# 📁 Loyiha Strukturasi

## 🎯 Umumiy Ko'rinish

```
university-frontend/
├── public/                 # Static fayllar
├── src/
│   ├── api/               # API calls
│   ├── components/        # React komponentlar
│   │   ├── Layout/       # Layout komponentlari
│   │   ├── features/     # Feature-specific komponentlar
│   │   ├── shared/       # Umumiy komponentlar
│   │   └── ui/           # Shadcn/ui komponentlar
│   ├── config/           # ✨ YANGI! Konfiguratsiya fayllar
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility funksiyalar (cn, etc.)
│   ├── pages/            # Sahifalar
│   ├── services/         # Business logic
│   ├── store/            # State management (Zustand)
│   ├── types/            # TypeScript types
│   ├── utils/            # ✨ YANGI! Helper funksiyalar
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── .env.example          # ✨ YANGI! Environment variables namunasi
├── components.json       # Shadcn/ui config
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json
```

---

## 📦 **src/components/** - Komponentlar

### **Layout/** - Layout Komponentlari
```
Layout/
├── Header/
│   ├── Navbar.tsx
│   ├── Logo.tsx
│   └── index.tsx
├── Footer.tsx
├── MainContent.tsx
└── index.tsx
```

**Maqsad:** Sahifa tuzilishi (header, footer, sidebar)

---

### **shared/** - Umumiy Komponentlar
```
shared/
├── Banner.tsx          # Sahifa banner
├── Breadcrumbs.tsx     # Yo'l ko'rsatkich
├── Container.tsx       # Kontent wrapper
├── Sidebar.tsx         # Yon menyu
├── ErrorBoundary.tsx   # ✨ YANGI! Xatolik ushlash
└── index.ts
```

**Maqsad:** Loyiha bo'ylab qayta ishlatiladigan umumiy komponentlar

**Ishlatish:**
```tsx
import { Banner, Breadcrumbs, Container } from '@/components/shared';
```

---

### **ui/** - Shadcn/ui Komponentlar
```
ui/
├── alert.tsx           # Ogohlantirish
├── badge.tsx           # Nishon
├── button.tsx          # Tugma
├── card.tsx            # Karta
├── input.tsx           # Input
├── label.tsx           # ✨ YANGI! Label
├── skeleton.tsx        # ✨ YANGI! Loading skeleton
├── textarea.tsx        # ✨ YANGI! Textarea
└── index.ts
```

**Maqsad:** Shadcn/ui asosidagi UI primitives

**Ishlatish:**
```tsx
import { Button, Input, Card, Badge } from '@/components/ui';
```

---

### **features/** - Feature-specific Komponentlar
```
features/
├── news/
│   ├── NewsCard.tsx
│   └── NewsList.tsx
├── contact/
│   └── ContactForm.tsx
└── announcements/
    └── AnnouncementCard.tsx
```

**Maqsad:** Maxsus funksiyalar uchun komponentlar

---

## ⚙️ **src/config/** - Konfiguratsiya ✨ YANGI!

### **constants.ts** - Global Konstantalar
```typescript
import { APP_NAME, COLORS, ITEMS_PER_PAGE } from '@/config/constants';
```

**Nima bor:**
- Loyiha ma'lumotlari (APP_NAME, APP_DESCRIPTION)
- API konfiguratsiyasi (API_BASE_URL, API_TIMEOUT)
- Pagination (ITEMS_PER_PAGE)
- Ranglar (COLORS)
- Breakpoints (BREAKPOINTS)
- Tillar (LANGUAGES)
- Validation qoidalari (VALIDATION)
- Cache sozlamalari (CACHE_KEYS, CACHE_TIME)

---

### **routes.ts** - Route Yo'llari
```typescript
import { ROUTES, createRoute } from '@/config/routes';

// Ishlatish
<Link to={ROUTES.NEWS}>Yangiliklar</Link>
<Link to={createRoute.newsDetail('slug-123')}>Yangilik</Link>
```

**Nima bor:**
- Barcha route yo'llari (ROUTES)
- Route yaratish funksiyalari (createRoute)
- Breadcrumb labels (ROUTE_LABELS)

---

### **env.ts** - Environment Variables
```typescript
import { ENV } from '@/config/env';

if (ENV.IS_DEV) {
  console.log('Development mode');
}
```

**Nima bor:**
- API_URL
- NODE_ENV, IS_DEV, IS_PROD
- Feature flags

---

## 🛠️ **src/utils/** - Utility Funksiyalar ✨ YANGI!

### **format.ts** - Formatlash
```typescript
import { formatDate, formatNumber, truncateText } from '@/utils/format';

formatDate(new Date()); // "1 Noyabr 2025"
formatNumber(1000); // "1,000"
truncateText('Long text...', 10); // "Long te..."
```

**Funksiyalar:**
- `formatDate()` - Sana formatlash
- `formatDateTime()` - Sana va vaqt
- `formatRelativeTime()` - "2 soat oldin"
- `formatNumber()` - Raqam formatlash
- `formatCurrency()` - Pul
- `formatPhone()` - Telefon raqam
- `truncateText()` - Matnni qisqartirish
- `createSlug()` - URL slug yaratish
- `capitalize()` - Birinchi harfni katta qilish

---

### **validation.ts** - Validatsiya
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
- `isValidFileSize()` - Fayl hajmi
- `isValidFileType()` - Fayl turi

---

### **helpers.ts** - Yordamchi Funksiyalar
```typescript
import { debounce, chunk, copyToClipboard } from '@/utils/helpers';

const handleSearch = debounce((query) => {
  // Search logic
}, 300);

const chunks = chunk([1,2,3,4,5], 2); // [[1,2], [3,4], [5]]
await copyToClipboard('Text to copy');
```

**Funksiyalar:**
- `debounce()` - Debounce
- `throttle()` - Throttle
- `sleep()` - Async sleep
- `chunk()` - Array'ni bo'lish
- `unique()` - Dublikatlarni olib tashlash
- `shuffle()` - Aralashtirib yuborish
- `deepClone()` - Chuqur nusxa
- `buildQueryString()` - Query string yaratish
- `setLocalStorage()` / `getLocalStorage()` - LocalStorage
- `copyToClipboard()` - Clipboard ga nusxalash
- `scrollToTop()` - Yuqoriga scroll
- `generateId()` - Random ID yaratish

---

## 🎨 **src/lib/** - Library Utilities

### **utils.ts** - cn() Funksiyasi
```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-class', isActive && 'active-class')} />
```

**Maqsad:** Tailwind klasslarni birlashtirish va konfliktlarni hal qilish

---

## 🔧 **Optimizatsiyalar**

### ✅ **1. cn() Takrorlanish Tozalandi**
**Oldin:**
```typescript
// Har bir komponentda
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Hozir:**
```typescript
// Faqat import
import { cn } from '@/lib/utils';
```

---

### ✅ **2. Shared Komponentlar Ajratildi**
**Oldin:**
```
components/ui/
├── Button.tsx
├── Banner.tsx      ❌ UI primitive emas
├── Breadcrumbs.tsx ❌ UI primitive emas
└── Container.tsx   ❌ UI primitive emas
```

**Hozir:**
```
components/
├── ui/              ✅ Faqat Shadcn/ui
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
└── shared/          ✅ Umumiy komponentlar
    ├── Banner.tsx
    ├── Breadcrumbs.tsx
    └── Container.tsx
```

---

### ✅ **3. Constants Markazlashtirildi**
**Oldin:**
```typescript
// Har bir faylda
const API_URL = 'http://localhost:3000/api';
const ITEMS_PER_PAGE = 10;
```

**Hozir:**
```typescript
import { API_BASE_URL, ITEMS_PER_PAGE } from '@/config/constants';
```

---

### ✅ **4. Utility Funksiyalar Qo'shildi**
- Format utilities (sana, raqam, matn)
- Validation utilities (email, telefon, parol)
- Helper utilities (debounce, throttle, localStorage)

---

### ✅ **5. Error Boundary Qo'shildi**
```tsx
import { ErrorBoundary } from '@/components/shared';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

### ✅ **6. Environment Variables**
`.env.example` fayli yaratildi - loyihani sozlash uchun namuna

---

## 📚 **Qanday Ishlatish**

### **1. Komponentlar**
```tsx
// UI komponentlar
import { Button, Input, Card } from '@/components/ui';

// Shared komponentlar
import { Banner, Breadcrumbs } from '@/components/shared';
```

### **2. Config**
```tsx
import { ROUTES, COLORS, API_BASE_URL } from '@/config';
```

### **3. Utils**
```tsx
import { formatDate, isValidEmail, debounce } from '@/utils';
```

### **4. Hooks**
```tsx
import { useNewsData } from '@/hooks/useNewsData';
```

---

## 🎯 **Best Practices**

1. ✅ **Import'larni @ alias bilan yozing**
   ```tsx
   import { Button } from '@/components/ui';  // ✅ To'g'ri
   import Button from '../../components/ui';  // ❌ Noto'g'ri
   ```

2. ✅ **Konstantalarni config dan oling**
   ```tsx
   import { ROUTES } from '@/config';  // ✅ To'g'ri
   const route = '/news';              // ❌ Noto'g'ri
   ```

3. ✅ **Utility funksiyalarni qayta ishlatmang**
   ```tsx
   import { formatDate } from '@/utils';  // ✅ To'g'ri
   const formatDate = (date) => { ... }   // ❌ Noto'g'ri
   ```

4. ✅ **Error Boundary ishlatish**
   ```tsx
   <ErrorBoundary>
     <YourComponent />
   </ErrorBoundary>
   ```

---

**Muallif:** NAMDTU Development Team  
**Sana:** 2025-11-01  
**Versiya:** 2.0

