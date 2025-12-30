# Universal (Polimorf) Batafsil Sahifa Arxitekturasi Qo'llanmasi

Ushbu hujjat loyihada "Ko'p qirrali" (Polimorf) universal sahifa tizimini joriy qilish va undan foydalanish bo'yicha standart yo'riqnomadir.
Maqsad: Kod takrorlanishini yo'qotish, yangi bo'limlarni oson qo'shish va tizimni tartibli saqlash.

---

## 🏗️ 1. Arxitektura Tuzilishi (Konsept)

Biz har bir bo'lim uchun alohida fayl ochmaymiz (`NewsDetail`, `ServiceDetail` - Kerak emas ❌).
O'rniga bitta umumiy **Menedjer Sahifa** (`GenericDetailPage`) ishlatamiz.

Bu sahifa 3 ta asosiy qismdan iborat bo'ladi:
1.  **Router (Buyurtmachi):** Sahifaga "Siz kimsiz?" (News? Service?) degan buyruqni beradi.
2.  **GenericPage (Menedjer):** Routerdan buyruqni olib, mos API dan ma'lumotni yuklaydi va tozalaydi.
3.  **DetailTemplate (Ijrochi):** Tozalangan ma'lumotni chiroyli qilib chizib beradi (Hozir sizda bor).

---

## 🛠️ 2. Amalga Oshirish Bosqichlari (Reja)

### I. Router Sozlamalari (App.tsx / routes.tsx)
Har bir yo'nalish uchun bitta komponentni chaqiramiz, lekin har xil `type` bilan.

```tsx
// Misol (Kodni o'zgartirmayman, faqat tushuntirish):
<Route path="/news/:slug" element={<GenericDetailPage type="news" />} />
<Route path="/services/:slug" element={<GenericDetailPage type="service" />} />
<Route path="/staff/:slug" element={<GenericDetailPage type="person" />} />
```

### II. GenericDetailPage (Miyya)
Bu fayl `src/pages/GenericDetail/index.tsx` da joylashishi tavsiya etiladi.

**Uning vazifasi:**
1.  **API Map (Xarita):** `type` ga qarab qaysi funksiyani chaqirishni bilish.
    *   `news` -> `getPostBySlug`
    *   `service` -> `getServiceBySlug`
2.  **Data Normalization (Tozalash):** Har xil API javoblarini bitta standart formatga (`DetailTemplate` tushunadigan tilga) o'tkazish.
3.  **Render:** Tayyor ma'lumotni `DetailTemplate` ga uzatish.

### III. DetailTemplate (Sizda allaqachon bor ✅)
Bu komponent o'zgarishsiz qoladi. U faqat ma'lumotni ko'rsatishga javobgar.

---

## 🚀 3. Yangi Bo'lim Qo'shish Yo'riqnomasi

Kelajakda saytga yangi bo'lim (masalan, **"Events" (Tadbirlar)**) qo'shmoqchi bo'lsangiz, quyidagi qadamlarni bajarasiz:

### 1-qadam: API (Agar yo'q bo'lsa)
Backenddan ma'lumot olib keluvchi funksiyani tayyorlaysiz (yoki borini ishlatasiz).
*   `services/eventService.ts` -> `getEventBySlug(slug)`

### 2-qadam: GenericPage ga tanishtirish
`GenericDetailPage` ichidagi "API Map" ga yangi turni qo'shasiz:
```typescript
const apiMap = {
  news: getPostBySlug,
  service: getServiceBySlug,
  events: getEventBySlug, // <-- Yangi qo'shildi
};
```

### 3-qadam: Routerga ulash
Faqat bitta qator kod bilan yangi manzil ochasiz:
```tsx
<Route path="/events/:slug" element={<GenericDetailPage type="events" />} />
```

**Bo'ldi!** 🎉
Siz hech qanday yangi sahifa, CSS yoki HTML yozmadingiz. "Events" sahifasi avtomatik ravishda `DetailTemplate` dizaynida, lekin o'ziga xos ma'lumotlari bilan ishga tushadi.

---

## ⚠️ 4. Muhim Qoidalar (Best Practices)

1.  **Logikani Templatega tiqmang:** `DetailTemplate` faqat ko'rinish (UI) bilan shug'ullansin. Ma'lumotni olish va to'g'irlash `GenericPage`ning ishi.
2.  **Type Safety:** `type` larni TypeScript `enum` yoki `union type` qilib yozib qo'ying (masalan: `'news' | 'service' | 'person'`). Bu xato yozishni oldini oladi.
3.  **Fallback:** Agar `type` noto'g'ri kelsa yoki API topilmasa, `404 Not Found` sahifasiga yo'naltirishni unutmang.

Bu tizim loyihangizni yillar davomida tartibli va boshqaruvchan saqlashga yordam beradi.
