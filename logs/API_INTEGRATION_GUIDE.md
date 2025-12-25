# ElmapiCMS API Integratsiyasi Qo'llanmasi

Ushbu hujjat `university-frontend` loyihasi va **ElmapiCMS** backend o'rtasidagi bog'lanishni tushuntiradi. Hozirgi kunda amalga oshirilgan tuzatishlar va kelgusida yangi sahifalarni ulash uchun qo'llanma sifatida xizmat qiladi.

## 1. Asosiy Konfiguratsiya

API bilan muvaffaqiyatli bog'lanish uchun quyidagi sozlamalar o'ta muhim. Ular `.env` faylida va `src/api/client.ts` da sozlangan.

### Kerakli Headerlar
Har bir so'rovda quyidagi headerlar bo'lishi **SHART**:
1.  **Authorization**: `Bearer {token}`
    *   Token `.env` faylidagi `REACT_APP_API_TOKEN` dan olinadi.
2.  **project-id**: `{UUID}`
    *   Bu **Project ID (Integer)** EMAS, balki **Project UUID** bo'lishi kerak.
    *   Qiymat `.env` faylidagi `REACT_APP_PROJECT_ID` dan olinadi (Masalan: `3ab8ba3b-7d36-4cd8-b099-391b7bd19afd`).

Bu headerlar `src/api/client.ts` faylida avtomatik ravishda har bir so'rovga qo'shiladi.

---

## 2. API Endpoint Andozasi (Pattern)

Bizning tadqiqotlarimiz natijasida **Public API** uchun quyidagi format ishlayotgani aniqlandi:

```
GET /api/projects/{PROJECT_UUID}/content/{COLLECTION_SLUG}
```

*   **PROJECT_UUID**: Loyihaning UUID raqami (env faylidan olinadi).
*   **COLLECTION_SLUG**: Ma'lumotlar to'plamining nomi (masalan: `news`, `faculties`, `announcements`).

**Misol:**
Yangiliklarni olish uchun so'rov:
`https://new.namdtu.uz/api/projects/3ab8ba3b-7d36-4cd8-b099-391b7bd19afd/content/news`

---

## 3. Joriy Holat (Nimalar Tuzatildi?)

Quyidagi fayllar yangi API formatiga o'tkazildi va ishlamoqda:

*   **Yangiliklar (News):** `src/api/http/posts.http.ts`
    *   Eski: `/content/news` (404 Xato)
    *   Yangi: `/projects/${projectId}/content/news` (200 OK)
*   **Fakultetlar (Faculties):** `src/api/http/faculties.http.ts`
    *   Eski: `/content/faculties` (404 Xato)
    *   Yangi: `/projects/${projectId}/content/faculties` (200 OK)
*   **Bosh Sahifa (Home):** `src/api/http/home.http.ts`
    *   Yangiliklar va Fakultetlar qismi yangilandi.
    *   *Eslatma:* `hero`, `stats` kabi qismlar hozircha `mock` (soxta) ma'lumotlarda ishlamoqda, chunki backendda ular uchun endpoint topilmadi.

---

## 4. Yangi Integratsiyalarni Qo'shish (Steps)

Agar kelajakda yangi sahifa yoki bo'lim (masalan, "Kafedralar" - `departments`) qo'shmoqchi bo'lsangiz, quyidagi qadamlarni bajaring:

### 1-qadam: Backenddagi Slug'ni aniqlang
Admin panelga kiring yoki mavjud ma'lumotlardan foydalanib, kerakli kolleksiyaning `slug`ini toping.
*   Misol: `departments`

### 2-qadam: Yangi HTTP fayl yaratish
`src/api/http/` papkasida yangi fayl yarating (masalan, `departments.http.ts`).

### 3-qadam: So'rov yozish
Quyidagi shablon asosida kod yozing:

```typescript
import apiClient from '../client';

export const getDepartments = async () => {
    try {
        // Project ID ni olish
        const projectId = process.env.REACT_APP_PROJECT_ID;
        
        // To'g'ri URL formatidan foydalanish
        const response = await apiClient.get(`/projects/${projectId}/content/departments`, {
            params: { 
                with: 'image', // Kerakli relationlar
                per_page: 20   // Sahifalash
            }
        });

        // Ma'lumotlarni qaytarish
        return response.data;
    } catch (error) {
        console.error("Departments fetch error:", error);
        return [];
    }
};
```

### 4-qadam: Transformat (Mapping)
Backenddan kelgan ma'lumotlar tuzilishi (structure) frontendga mos kelmasligi mumkin. `map` funksiyasi orqali ularni to'g'irlang:
*   `id` o'rniga ba'zan `uuid` kelishi mumkin.
*   `title` yoki `name` maydonlarini tekshiring.
*   Rasmlar odatda `image.url` yoki `icon.url` ichida bo'ladi.

---

## 5. Muammolarni Hal Qilish (Troubleshooting)

| Muammo | Sabab | Yechim |
| :--- | :--- | :--- |
| **404 Not Found** | URL noto'g'ri yoki Project UUID xato. | URLda `/projects/{UUID}/...` borligini va `.env` dagi ID to'g'riligini tekshiring. |
| **400 Bad Request** | `project-id` headeri yetishmayapti. | `client.ts` faylida header to'g'ri sozlanganligiga ishonch hosil qiling. |
| **401 Unauthorized** | Token xato yoki muddati tugagan. | `.env` dagi `REACT_APP_API_TOKEN` ni yangilang. |
| **HTML javob qaytyapti** | API URL xato (masalan, oddiy veb sahifaga so'rov ketyapti). | Endpoint `api/` bilan boshlanganini tekshiring. |

---

Hozirgi integratsiya barqaror va yangi qo'shiladigan barcha kolleksiyalar uchun ushbu andozadan foydalanish tavsiya etiladi.
