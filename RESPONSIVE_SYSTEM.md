# Universal Responsive Design System

Bu hujjat loyihada joriy qilingan universal responsive design tizimini tavsiflari beradi.

## 📋 Tizim Overview

Responsive design tizimi barcha komponentlar uchun consistent typography, spacing va layout ta'minlaydi.

## 🛠️ Komponentlar

### 1. **Utility Functions** (`src/utils/responsive.ts`)
- Fluid typography scale
- Fluid spacing scale
- Container utilities
- Responsive classes

### 2. **CSS Custom Properties** (`src/index.css`)
```css
:root {
  --text-xs: clamp(0.75rem, 2vw, 0.875rem);
  --text-sm: clamp(0.875rem, 2.5vw, 1rem);
  /* ... */
}
```

### 3. **Tailwind Extensions** (`tailwind.config.js`)
```javascript
fontSize: {
  'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
  'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
  // ...
}
```

### 4. **Type Definitions** (`src/types/responsive.ts`)
- Type-safe responsive props
- Breakpoint utilities
- Interface definitions

### 5. **React Hooks** (`src/hooks/useResponsive.ts`)
- `useResponsive()` - screen size detection
- `useMediaQuery()` - custom media queries
- `useResponsiveValue()` - breakpoint-based values

## 🎯 Foydalanish

### **Typography**
```tsx
// Utility function
import { getResponsiveText } from '@/utils/responsive';

<div className={getResponsiveText('xl')}>
  Responsive text
</div>

// Tailwind class
<h1 className="text-fluid-3xl">
  Large heading
</h1>

// CSS custom property
<div style={{ fontSize: 'var(--text-xl)' }}>
  Custom styled text
</div>
```

### **Spacing**
```tsx
// Utility function
import { getResponsiveSpacing } from '@/utils/responsive';

<div className={getResponsiveSpacing('lg')}>
  Spaced content
</div>

// Tailwind class
<div className="p-fluid-lg m-fluid-md">
  Responsive spacing
</div>
```

### **Layout**
```tsx
// Container utility
import { getContainerClass } from '@/utils/responsive';

<div className={getContainerClass('lg')}>
  Centered content
</div>

// Responsive hook
import { useResponsive } from '@/hooks/useResponsive';

const MyComponent = () => {
  const { isMobile, isDesktop } = useResponsive();

  return (
    <div className={isMobile ? 'grid-cols-1' : 'grid-cols-3'}>
      Content
    </div>
  );
};
```

## 📐 Scale Values

### **Typography Scale**
- `xs`: 12px → 14px
- `sm`: 14px → 16px
- `base`: 16px → 18px
- `lg`: 18px → 20px
- `xl`: 20px → 24px
- `2xl`: 24px → 32px
- `3xl`: 32px → 48px

### **Spacing Scale**
- `xs`: 8px → 12px
- `sm`: 12px → 16px
- `md`: 16px → 24px
- `lg`: 24px → 32px
- `xl`: 32px → 48px
- `2xl`: 48px → 64px

### **Breakpoints**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔧 Configuration

### **CSS Custom Properties**
Barcha fluid values CSS custom properties orqali sozlanishi mumkin:

```css
:root {
  --text-base: clamp(1rem, 3vw, 1.125rem);
  --space-md: clamp(1rem, 2.5vw, 1.5rem);
}
```

### **Tailwind Config**
Yangi breakpoints yoki values qo'shish:

```javascript
theme: {
  extend: {
    screens: {
      '3xl': '1600px',
    },
    fontSize: {
      'fluid-4xl': 'clamp(2.5rem, 7vw, 4rem)',
    }
  }
}
```

## ✅ Best Practices

1. **Mobile-first approach** - kichik ekranlardan boshlang
2. **Consistent scale** - har doim scale'dan foydalaning
3. **Performance** - CSS custom properties runtime'da o'zgaradi
4. **Type safety** - TypeScript interfaces ishlatish
5. **Testing** - har bir breakpoint'da test qilish

## 🚀 Migration

### **Eski kod:**
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  Title
</h1>
```

### **Yangi kod:**
```tsx
import { responsiveClasses } from '@/utils/responsive';

<h1 className={responsiveClasses.heading1}>
  Title
</h1>
```

Yoki:
```tsx
<h1 className="text-fluid-3xl">
  Title
</h1>
```

## 📊 Benefits

- **Consistency** - barcha komponentlarda bir xil
- **Maintainability** - bitta joydan o'zgartirish
- **Scalability** - yangi sahifalar avtomatik responsive
- **Developer Experience** - kam kod, ko'p funksionallik
- **Performance** - optimizatsiya qilingan CSS

Bu tizim professional, scalable va maintainable responsive design ta'minlaydi.