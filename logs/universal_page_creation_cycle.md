# Universal Batafsil Sahifa: Yaratish va Ishlatish Jarayoni (Texnik Reja)

Ushbu hujjat loyihada "Universal (Polimorf) Batafsil Sahifa" (`GenericDetailPage`) tizimini **noldan yaratish** va uni **ishlatish** jarayonini bosqichma-bosqich tushuntiradi.

---

## 📂 1. Qatnashuvchi Fayllar va Ularning Vazifasi

Bu tizim ishlashi uchun quyidagi fayllar zanjirvari bog'lanadi:

| № | Fayl Yo'li | Vazifasi |
|---|------------|----------|
| 1 | `src/types/models.ts` | **Pasport stoli:** Ma'lumotlarning qolipi (type) shu yerda aniqlanadi. |
| 2 | `src/services/*.ts` | **Ta'minotchi:** API dan ma'lumot olib keluvchi funksiyalar (masalan, `newsService.ts`, `serviceService.ts`). |
| 3 | `src/pages/GenericDetail/index.tsx` | **Menedjer (Yangi yaratiladi):** Butun jarayonni boshqaruvchi "Miyya". U API va Dizaynni bog'laydi. |
| 4 | `src/components/templates/DetailTemplate.tsx` | **Rassom:** Tayyor ma'lumotni ekranga chizib beruvchi shablon. |
| 5 | `src/routes.tsx` (yoki `App.tsx`) | **Dispetcher:** Foydalanuvchi manziliga qarab, to'g'ri buyruq beruvchi. |

---

## 🛠️ 2. Yaratish Jarayoni (Implementation Lifecycle)

Agar siz bu tizimni birinchi marta quraotgan bo'lsangiz, jarayon quyidagicha kechadi:

### 1-Bosqich: "Type"larni Aniqlash (`types/`)
Avval ma'lumotlarimiz qanday ko'rinishda ekanligini aniqlab olamiz.
*   *Savol:* "Yangilik"da nimalar bor? "Xizmat"da nimalar bor?
*   *Amal:* Umumiy interfeyslarni yozish (masalan, `BaseContent`, `NewsItem`, `ServiceItem`).

### 2-Bosqich: API Ta'minotini Tekshirish (`services/`)
Kerakli ma'lumotni olib keladigan funksiyalar tayyormi?
*   *Amal:* `getBySlug(slug)` shaklidagi funksiyalar borligini tekshirish.

### 3-Bosqich: "Menedjer"ni Yaratish (`GenericDetail/index.tsx`) **(Eng Asosiy Qism)**
Bu fayl ichida 3 ta asosiy mantiq yoziladi:
1.  **Selection Logic:** `type="news"` kelsa -> `getNews` funksiyasini tanla.
2.  **Normalization Logic:** Kelgan ma'lumotni `DetailTemplate` tushunadigan "standart" holatga keltir.
    *   *Misol:* API dan `body_text` kelsa, uni `content` ga o'zgartir. `cost` kelsa, uni chiroyli qilib matnga qo'sh.
3.  **UI Config:** `type`ga qarab dizaynni sozla (Sidebar kerakmi? Share tugmasi-chi?).

### 4-Bosqich: Marshrutlash (`App.tsx`)
Tizimni ishga tushirish uchun Routerga "buyruq" berish.
*   *Amal:* `<Route path="/:type/:slug" ... />` yoki alohida `/news/:slug` larni `GenericPage`ga bog'lash.

---

## 🔄 3. Ma'lumotlar Oqimi (Data Flow Diagram)

Foydalanuvchi saytga kirganda jarayon qanday kechadi?

1.  **Foydalanuvchi:** `/services/kompyuter-savodxonligi` ga kiradi.
2.  **App (Router):** "Aha, bu `/services` yo'li ekan. Demak, `GenericDetailPage`ni `type='service'` deb chaqiraman".
3.  **GenericDetailPage (Menedjer):**
    *   "Menga `service` buyrug'i keldi."
    *   "Demak, `serviceService.getServiceBySlug(...)` ni ishlataman."
    *   *...yuklanmoqda...*
    *   "Ma'lumot keldi! Endi buni `DetailTemplate`ga moslab beraman."
    *   "Sidebar kerak emas, rasm o'rniga icon qo'yaman."
4.  **DetailTemplate (Rassom):** Menedjerdan kelgan toza ma'lumotni olib, ekranga chizadi.
5.  **Foydalanuvchi:** Tayyor sahifani ko'radi.

---

## 📝 4. Xulosa

Bu reja yordamida har safar yangi sahifa uchun "velosiped ixtiro qilish" shart emas. Siz faqat **zanjirning kerakli halqasini** (masalan, yangi API qo'shish) ulaysiz va tizim o'zi ishlayveradi.
