# Avloniy.uz Dizayn Migratsiya Rejasi

Ushbu hujjat loyihaning hozirgi dizaynini Avloniy.uz uslubidagi "premium" dizaynga o'tkazish bo'yicha bosqichma-bosqich reja va ko'rsatmalarni o'z ichiga oladi.

## 1. Global Ranglar Tizimi (Color System) 🎨

`src/index.css` faylidagi `:root` o'zgaruvchilarini yangilash orqali butun loyiha ranglarini o'zgartirish kerak.

### Fon va Matn Ranglari
*   **Background (`--background`):**
    *   **Hozir:** `#f7f7f7`
    *   **Maqsad:** `#F2F4F9` (Yumshoq, zamonaviy kulrang-moviy fon).
    *   *Izoh:* Bu rang ko'zga yumshoqroq va oq rangli kartochkalar bilan yaxshi kontrast hosil qiladi.
*   **Foreground (`--foreground`):**
    *   **Hozir:** `#212121`
    *   **Maqsad:** `#010b1b` (To'q, deyarli qora ko'k).
    *   *Izoh:* Matnlar "qimmatroq" va o'qishliroq ko'rinadi.
*   **Primary Color (`--primary`):**
    *   **Maqsad:** Aniq va yorqin ko'k rang (`#0284c7` yoki `blue-600`).

### Tavsiya etilgan CSS O'zgarishlari (`src/index.css`):
```css
:root {
  /* Yangi ranglar */
  --background: 220 33% 96%; /* #F2F4F9 */
  --foreground: 218 92% 5%;  /* #010b1b */
  --primary: 204 94% 39%;    /* #0284c7 */
  
  /* Radiusni oshirish (yumaloqlik) */
  --radius: 0.75rem; /* 12px - oldingi 0.5rem (8px) dan kattaroq */
}
```

## 2. Tipografiya (Typography) ✍️

Shrift va matn o'lchamlarini standartlashtirish.

*   **Font Family:** Sarlavhalar va matn uchun yagona `Inter` (yoki shunga o'xshash zamonaviy sans-serif) shriftidan foydalanish. `Montserrat` agar faqat dekorativ bo'lsa, olib tashlash yoki faqat juda katta sarlavhalarda qoldirish.
*   **Sarlavhalar (`Headings`):**
    *   `h1`: 22px-26px, `font-medium` (qalin emas).
    *   Rang: `#010b1b`.
*   **Matn (`Body`):**
    *   Rang: `#242d3a` (Asosiy matn uchun biroz yumshoqroq rang).
    *   Line Height: `leading-relaxed` (o'qishni osonlashtirish uchun qatorlar orasi kengroq).

## 3. Komponentlar Dizayni (UI Kit) 🧩

Har bir sahifada qayta yozmaslik uchun global klasslar yoki komponentlar yaratish.

### 3.1. Kartochkalar (Cards)
Loyihadagi barcha kontent (yangiliklar, e'lonlar, ro'yxatlar) quyidagi stilda bo'lishi kerak:
```css
.card-premium {
  @apply bg-white rounded-2xl shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden;
}
```
*   **Xususiyatlari:** Oq fon, 16-20px radius, juda yengil va yumshoq soya, ingichka kulrang chegara.

### 3.2. Badjlar (Badges/Pills)
Sana, kategoriya va boshqa meta ma'lumotlar uchun:
```css
.badge-avloniy {
  @apply flex items-center gap-2 bg-[#F2F4F9] border border-[#DFE4ED] text-[#010b1b] rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-200 cursor-default;
}
```

### 3.3. Tugmalar (Buttons)
Tugmalar ham umumiy radius (`--radius`) o'zgarishi hisobiga yumaloqroq bo'ladi. `box-shadow` va `transition` effektlarini barchasiga qo'shish kerak.

## 4. Layout va Ikonkalar ✨

*   **Ikonkalar:** Loyihadagi barcha `react-icons` (FontAwesome, Material) larni **`lucide-react`** ga almashtirish.
    *   Uslub: Ingichka chiziqli, zamonaviy.
    *   O'lcham: Odatda 16px-20px.
*   **Spacing (Masofalar):** Elementlar orasidagi masofani kengaytirish (`gap-6`, `p-6` yoki `p-8`). Zich joylashuvdan qochish.

## 5. Amalga Oshirish Ketma-ketligi

1.  **Global Sozlamalar:** `src/index.css` va `tailwind.config.js` ni yangilash (Ranglar va radius).
2.  **Layoutni Tozalash:** `MainLayout` va `PageTemplate` ni tekshirib, ortiqcha konteynerlar va eskirgan stillarni olib tashlash.
3.  **Home Page:** Bosh sahifadagi bloklarni ("Yangiliklar", "E'lonlar") yangi `card-premium` tiliga o'tkazish.
4.  **Detail Pages:** Barcha ichki sahifalarni (biz hozir qilganimizdek) `GenericDetailPage` va `DetailTemplate` orqali yangi dizaynga o'tkazish.
5.  **Refactoring:** Eski CSS fayllar va foydalanilmayotgan komponentlarni o'chirish.
