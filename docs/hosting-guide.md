# Production Hosting & Performance Guide

Loyihaning maksimal tezligini ta'minlash uchun PRODUCTION serverda (Nginx, Apache, Vercel) quyidagi sozlamalarni bajarish tavsiya etiladi.

## 1. Brotli Siqishni Yoqish (Nginx)

`avloniy.uz` va boshqa tezkor saytlar **Brotli** siqish algoritmidan foydalanadi. U Gzip'dan ko'ra 20-30% samaraliroq.

Nginx konfiguratsiyasiga (`/etc/nginx/nginx.conf`) quyidagini qo'shing:

```nginx
brotli on;
brotli_comp_level 6;
brotli_static on;
brotli_types text/plain text/css application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript image/x-icon image/vnd.microsoft.icon image/bmp image/svg+xml;
```

*Eslatma: Brotli moduli Nginx'da o'rnatilgan bo'lishi kerak.*

## 2. Keshlashtirish Strategiyasi (Cache-Control)

Statik fayllar (rasmlar, shriftlar, JS/CSS yig'indilari) uchun brauzer keshini maksimal darajada ishlating.

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|avif|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, no-transform";
}
```

## 3. API Optimizatsiyasi

Backend (API) so'rovlari uchun TTFB (Time To First Byte) vaqtini kamaytirish kerak:
- Ma'lumotlar bazasida indexlar to'g'ri o'rnatilganligini tekshiring.
- API javoblarini Redis yoki shunga o'xshash xotira keshida saqlang.

## 4. HTTPS va HTTP/2

HTTP/2 protokolini yoqish orqali bir vaqtning o'zida bir nechta resurslarni yuklash tezligini oshiring.

```nginx
listen 443 ssl http2;
```

---
Ushbu sozlamalar loyihamizdagi **Prefetching** va **WebP** optimizatsiyalari bilan birgalikda saytning oniy (instant) ochilishini ta'minlaydi.
