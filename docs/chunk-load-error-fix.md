# ChunkLoadError — Muammo va Yechim

## Muammo nima edi?

Sayt yangi versiyaga yangilanganda (deploy) foydalanuvchilar brauzerida quyidagi xato paydo bo'ldi:

```
ChunkLoadError: Loading chunk 8929 failed.
(missing: https://namdtu.uz/static/js/8929.c271e76b.chunk.js)

Uncaught SyntaxError: expected expression, got '<'
```

Sahifa ko'rsatilmay, "Ilova yangilandi" oynasi chiqardi.

---

## Sababi nima?

React ilovasi **code splitting** (lazy loading) dan foydalanadi. Har bir sahifa alohida `.chunk.js` fayl sifatida yig'iladi va hash-nomi bo'ladi (masalan, `8929.c271e76b.chunk.js`).

**Deploy qilinganda** bu fayllarning hash nomlari o'zgaradi. Lekin:

1. **Service Worker** (SW) eski chunk fayllarni keshda saqlagan.
2. **Brauzer** yangi `index.html` ni yuklab, u yangi chunk nomlarini talab qildi.
3. SW esa shu nomli eski faylni keshda topa olmay, serverdagi `index.html` ni (React SPA fallback) qaytardi.
4. Brauzer JS o'rniga HTML olgach, `SyntaxError: expected expression, got '<'` xatosi berdi — chunki HTML `<` belgisi bilan boshlanadi.

---

## Yechim

### 1. Service Worker kesh versiyasini oshirish (`public/sw.js`)

Har yangi deployda kesh nomini o'zgartirish kerak. Bu SW ni qayta o'rnatish va barcha eski keshlarni tozalashga majbur qiladi.

```js
// Eski versiya (muammo)
const CACHE_NAME = 'university-frontend-v10';
const STATIC_CACHE = 'static-v10';
const DYNAMIC_CACHE = 'dynamic-v10';

// Yangi versiya (tuzatilgan)
const CACHE_NAME = 'university-frontend-v11';
const STATIC_CACHE = 'static-v11';
const DYNAMIC_CACHE = 'dynamic-v11';
```

`activate` hodisasida barcha eski keshlar o'chiriladi:

```js
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 2. APP_VERSION ni oshirish (`src/utils/helpers.ts`)

Sahifa yuklanganda brauzer `localStorage` dagi versiyani tekshiradi. Agar versiya farq qilsa, avtomatik kesh tozalanadi va sahifa yangilanadi.

```ts
// Har deploy oldidan bu raqamni oshiring:
export const APP_VERSION = '1.0.12'; // Avval 1.0.11 edi
```

### 3. Avtomatik reload tiklash (`src/utils/helpers.ts`)

`handleChunkError` funksiyasida kesh tozalangandan keyin sahifa avtomatik yangilanishi kerak edi, lekin bu o'chirib qo'yilgan edi:

```ts
// NOTO'G'RI (reload o'chirilgan edi):
console.warn("Automatic reload IS DISABLED per user request. Manual reload required.");

// TO'G'RI (tiklangan):
console.warn('Nuclear cleanup complete. Reloading page...');
window.location.reload(); // Sahifa fresh yuklanadi
```

---

## Jarayon qanday ishlaydi (tuzatilgandan keyin)?

```
Foydalanuvchi sahifani ochadi
        ↓
index.html → yangi chunk nomlarini so'raydi
        ↓
SW uni keshda topa olmaydi → HTML qaytaradi
        ↓
ChunkLoadError aniqlandi (helpers.ts → isChunkError)
        ↓
handleChunkError() chaqiriladi:
  1. Barcha SW registration'lar unregister qilinadi
  2. Barcha keshlar o'chiriladi
  3. window.location.reload() — sahifa yangilanadi
        ↓
Yangilanganda SW yangi versiya bilan o'rnatiladi
        ↓
Barcha fayllar to'g'ri yuklanadi ✅
```

---

## Kelajakda deploy qilganda nima qilish kerak?

> **Muhim:** Har yangi deploy oldidan 2 joyni yangilang:

| Fayl | O'zgartirish |
|---|---|
| `public/sw.js` | `CACHE_NAME`, `STATIC_CACHE`, `DYNAMIC_CACHE` versiyasini oshiring (v11 → v12 va h.k.) |
| `src/utils/helpers.ts` | `APP_VERSION` ni oshiring (`1.0.12` → `1.0.13` va h.k.) |

---

## Tegishli fayllar

- `public/sw.js` — Service Worker, kesh boshqaruvi
- `src/utils/helpers.ts` — `isChunkError`, `handleChunkError`, `safeLazy`, `APP_VERSION`
- `src/components/shared/error-boundary.tsx` — ChunkLoadError uchun Error Boundary
