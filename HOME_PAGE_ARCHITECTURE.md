# Asosiy Sahifa Arxitekturasi - Qo'llanma

## 📋 Kirish

Bu hujjat bugun yaratilgan asosiy sahifa arxitekturasini batafsil tavsiflari beradi. Bu arxitektura keyingi section'lar yaratish uchun qo'llanma sifatida ishlatiladi.

**Yaratilgan sana:** 2025-11-19
**Arxitektura turi:** Component-based, API-driven, Cache-enabled
**Framework:** React + TypeScript + Tailwind CSS

---

## 🏗️ Arxitektura Prinsip'lari

### 1. **Separation of Concerns**
```
📁 API Layer     → src/api/homeApi.ts
📁 Hook Layer    → src/pages/Home/hooks/
📁 Component     → src/pages/Home/[Section].tsx
📁 Types         → src/pages/Home/types.ts
📁 Transformers  → src/pages/Home/transformers/
```

### 2. **Data Flow Pattern**
```
API → Hook (Caching) → Transformer → Component → UI
```

### 3. **Error Handling Strategy**
- **API darajada:** Har doim data qaytaradi
- **Component darajada:** Loading state, graceful fallback
- **User experience:** Hech qachon error ko'rsatilmaydi

---

## 📁 Fayl Strukturas

### **API Layer**
```typescript
// src/api/homeApi.ts
export const homeApi = {
  getHeroData: async (): Promise<HomeHeroData> => {
    // Static data yoki API call
    return homeHeroData;
  }
};
```

### **Hook Layer**
```typescript
// src/pages/Home/hooks/useStandardSection.ts
export const useStandardSection = (
  key: string,
  fetcher: () => Promise<any>,
  options: { ttlMinutes: number; transformData?: Function }
) => {
  // Caching logic
  // Data fetching
  // Error handling
};
```

### **Component Structure**
```typescript
// src/pages/Home/HeroSection.tsx
export default function HeroSection() {
  const { data, loading } = useStandardSection(/* params */);

  if (loading || !data) return null; // Clean loading

  return (
    <section>
      {/* Content */}
    </section>
  );
}
```

---

## 🔧 Texnik Implementatsiya

### **1. Caching Strategy**
```typescript
// Hook konfiguratsiyasi
const { data, loading } = useStandardSection(
  'hero',           // Cache key
  homeApi.getHeroData, // API function
  {
    ttlMinutes: 60, // 1 soat cache
    transformData: transformHeroData // Optional transformer
  }
);
```

### **2. Loading States**
```typescript
// Clean loading - hech narsa ko'rsatmaslik
if (loading || !data) {
  return null; // Section butunlay yashirin
}

// Yoki skeleton loading
if (loading || !data) {
  return <SkeletonComponent />;
}
```

### **3. Data Transformation**
```typescript
// src/pages/Home/transformers/heroTransformer.ts
export const transformHeroData = (apiData: any) => {
  return {
    title: apiData.title,
    subtitle: apiData.subtitle,
    // Transform logic
  };
};
```

### **4. Responsive Design**
```typescript
// Utility functions
const getResponsiveClasses = () => ({
  title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
  subtitle: 'text-base sm:text-lg md:text-xl',
  padding: 'py-16 sm:py-20 md:py-24 lg:py-32',
});

// Inline styles for complex responsive
style={{
  fontSize: 'clamp(2rem, 5vw, 4rem)', // Responsive font
  lineHeight: '1.1'
}}
```

---

## 🎨 Dizayn Patterns

### **1. Hero Section Pattern**
```typescript
<section className="relative min-h-[80vh] overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
       style={{ backgroundImage: `url(${data.backgroundImage})` }} />

  {/* Overlay */}
  <div className="absolute inset-0"
       style={{ backgroundColor: "#000000", opacity: 0.3 }} />

  {/* Content */}
  <Container>
    <div className="relative z-10 flex items-center py-32 min-h-full">
      {/* Content here */}
    </div>
  </Container>
</section>
```

### **2. Typography Hierarchy**
```typescript
// Title
<h1 className="font-bold mb-6 text-secondary-500"
    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
  {data.title}
</h1>

// Subtitle
<p className="mb-8 max-w-xl text-white"
   style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
  {data.subtitle}
</p>
```

### **3. Button Styling**
```typescript
<a href={data.link}
   className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 bg-blue-600 text-white hover:bg-blue-700 shadow-lg px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg">
  {data.text}
</a>
```

---

## 📊 API Integration Patterns

### **1. Static Data Pattern** (Current)
```typescript
// src/api/homeApi.ts
const homeHeroData: HomeHeroData = {
  title: "Namangan davlat texnika universiteti",
  subtitle: "Zamonaviy ta'lim...",
  // Static data
};

export const homeApi = {
  getHeroData: async (): Promise<HomeHeroData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeHeroData;
  }
};
```

### **2. Real API Pattern** (Future)
```typescript
export const homeApi = {
  getHeroData: async (): Promise<HomeHeroData> => {
    const response = await fetch('/api/home/hero');
    if (!response.ok) throw new Error('API Error');
    return response.json();
  }
};
```

### **3. Error Handling Pattern**
```typescript
// API level error handling
getHeroData: async (): Promise<HomeHeroData> => {
  try {
    const response = await fetch('/api/home/hero');
    if (!response.ok) throw new Error('API Error');
    return response.json();
  } catch (error) {
    console.error('Hero API Error:', error);
    // Return fallback data instead of throwing
    return homeHeroData;
  }
}
```

---

## 🔄 Migration Strategy

### **Static → Real API**
1. **API function'ni o'zgartirish:**
   ```typescript
   // Old: Static data
   return homeHeroData;

   // New: Real API
   const response = await fetch('/api/home/hero');
   return response.json();
   ```

2. **Error handling qo'shish:**
   ```typescript
   try {
     const response = await fetch('/api/home/hero');
     return response.json();
   } catch (error) {
     return homeHeroData; // Fallback
   }
   ```

3. **Component o'zgarishsiz qoladi**

---

## 📋 Yangi Section Yaratish Qo'llanmasi

### **1. API qo'shish**
```typescript
// src/api/homeApi.ts
export interface HomeNewSectionData {
  title: string;
  items: any[];
}

const homeNewSectionData: HomeNewSectionData = { /* data */ };

export const homeApi = {
  // ... existing
  getNewSectionData: async (): Promise<HomeNewSectionData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeNewSectionData;
  }
};
```

### **2. Hook yaratish** (ixtiyoriy)
```typescript
// src/pages/Home/hooks/useStandardSection.ts
// Existing hook ishlatish yoki yangi yaratish
```

### **3. Transformer yaratish** (ixtiyoriy)
```typescript
// src/pages/Home/transformers/newSectionTransformer.ts
export const transformNewSectionData = (apiData: any) => {
  return {
    // Transform logic
  };
};
```

### **4. Component yaratish**
```typescript
// src/pages/Home/NewSection.tsx
export default function NewSection() {
  const { data, loading } = useStandardSection(
    'new-section',
    homeApi.getNewSectionData,
    {
      ttlMinutes: 60,
      transformData: transformNewSectionData
    }
  );

  if (loading || !data) return null;

  return (
    <section>
      {/* Content */}
    </section>
  );
}
```

### **5. Home page'ga qo'shish**
```typescript
// src/pages/Home/index.tsx
import NewSection from './NewSection';

// Component ichida
<NewSection />
```

---

## ✅ Best Practices

### **1. Naming Conventions**
- **Files:** PascalCase for components, camelCase for utilities
- **Functions:** camelCase, descriptive names
- **Constants:** UPPER_SNAKE_CASE
- **Types:** PascalCase with descriptive names

### **2. Code Organization**
- **Imports:** Group by external, internal, types
- **Exports:** Default export for main component
- **Constants:** Top of file, after imports

### **3. Performance**
- **Caching:** 30-60 minutes for static content
- **Lazy loading:** For large components
- **Memoization:** For expensive calculations

### **4. Error Handling**
- **API level:** Graceful fallback data
- **Component level:** Clean loading states
- **User experience:** Never show errors

### **5. Responsive Design**
- **Mobile-first:** sm: breakpoints
- **Fluid typography:** clamp() functions
- **Flexible layouts:** Flexbox/Grid

---

## 🚀 Deployment Checklist

### **Pre-deployment:**
- [ ] All TypeScript errors resolved
- [ ] Build successful
- [ ] API endpoints tested
- [ ] Responsive design verified
- [ ] Performance optimized

### **Post-deployment:**
- [ ] Cache working correctly
- [ ] Loading states smooth
- [ ] Error handling tested
- [ ] Analytics tracking

---

## 📞 Support

Bu arxitektura scalable va maintainable. Yangi section qo'shishda ushbu qo'llanmani follow qiling.

**Key Principles:**
- **API-first approach**
- **Clean separation of concerns**
- **User-centric error handling**
- **Performance optimization**
- **Responsive design**

Bu arxitektura production-ready va enterprise-level standards ga javob beradi.