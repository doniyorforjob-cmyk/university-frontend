# 🎨 Shadcn/ui Loyihada Ishlatish

## ✅ O'rnatilgan Komponentlar:

### 1. **Button** (`src/components/ui/Button.tsx`)
```tsx
import { Button } from '@/components/ui/Button';

// Asosiy ishlatish
<Button>Click me</Button>

// Variantlar
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// O'lchamlar
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// Link sifatida
<Button asLink to="/about">Go to About</Button>
```

### 2. **Badge** (`src/components/ui/badge.tsx`)
```tsx
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

// Custom ranglar
<Badge className="bg-green-600">Success</Badge>
<Badge variant="outline" className="border-yellow-500 text-yellow-700">Warning</Badge>
```

### 3. **Card** (`src/components/ui/card.tsx`)
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### 4. **Input** (`src/components/ui/input.tsx`)
```tsx
import { Input } from '@/components/ui/input';

<Input type="text" placeholder="Enter your name" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

---

## 🎨 Ranglar (CSS Variables)

Loyihada quyidagi ranglar sozlangan (`src/index.css`):

```css
:root {
  --primary: 235 79% 18%;        /* #0E104B - To'q ko'k */
  --secondary: 217 91% 60%;      /* Ko'k */
  --destructive: 0 84.2% 60.2%;  /* Qizil */
  --muted: 210 40% 96.1%;        /* Och kulrang */
  --accent: 210 40% 96.1%;       /* Accent */
}
```

---

## 📦 Qo'shimcha Komponentlar Qo'shish:

Agar boshqa Shadcn/ui komponentlarini qo'shmoqchi bo'lsangiz:

```bash
# Textarea
npx shadcn@latest add textarea

# Dialog (Modal)
npx shadcn@latest add dialog

# Dropdown Menu
npx shadcn@latest add dropdown-menu

# Tabs
npx shadcn@latest add tabs

# Alert
npx shadcn@latest add alert

# Avatar
npx shadcn@latest add avatar

# Checkbox
npx shadcn@latest add checkbox

# Select
npx shadcn@latest add select

# Table
npx shadcn@latest add table
```

**Yoki barcha komponentlarni ko'rish:**
```bash
npx shadcn@latest add
```

---

## 🔧 Utility Funksiyalar:

### `cn()` - Class Name Merger
```tsx
import { cn } from '@/lib/utils';

// Bir nechta klasslarni birlashtirish
<div className={cn("base-class", isActive && "active-class", className)} />

// Tailwind klasslarni merge qilish (konfliktlarni hal qiladi)
<div className={cn("px-4 py-2", "px-6")} /> // Natija: px-6 py-2
```

---

## 📁 Fayl Tuzilishi:

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx      ✅ Shadcn Button (custom wrapper)
│       ├── badge.tsx       ✅ Shadcn Badge
│       ├── card.tsx        ✅ Shadcn Card
│       ├── input.tsx       ✅ Shadcn Input
│       ├── index.ts        ✅ Export qilish
│       ├── Banner.tsx      (Custom)
│       ├── Breadcrumbs.tsx (Custom)
│       ├── Container.tsx   (Custom)
│       └── Sidebar.tsx     (Custom)
├── lib/
│   └── utils.ts            ✅ cn() utility
└── index.css               ✅ Shadcn CSS variables

components.json             ✅ Shadcn config
tailwind.config.js          ✅ Tailwind + Shadcn config
tsconfig.json               ✅ Path aliases (@/*)
```

---

## 🎯 Misol: HeroSection

```tsx
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <section>
      {/* Badge'lar */}
      <div className="flex gap-2 mb-4">
        <Badge>Davlat universiteti</Badge>
        <Badge variant="secondary">Akkreditatsiyalangan</Badge>
        <Badge variant="outline">Top 10</Badge>
      </div>

      {/* Sarlavha */}
      <h1>Namangan Davlat Texnika Universiteti</h1>

      {/* Buttonlar */}
      <div className="flex gap-4">
        <Button asLink to="/about" size="lg">
          Batafsil ma'lumot
        </Button>
        <Button asLink to="/contact" variant="outline" size="lg">
          Biz bilan bog'lanish
        </Button>
      </div>
    </section>
  );
};
```

---

## 🚀 Keyingi Qadamlar:

1. ✅ **Button** - O'rnatilgan va ishlamoqda
2. ✅ **Badge** - O'rnatilgan va ishlamoqda
3. ✅ **Card** - O'rnatilgan
4. ✅ **Input** - O'rnatilgan
5. ⏳ **Textarea** - Kerak bo'lsa qo'shing
6. ⏳ **Dialog** - Modal uchun
7. ⏳ **Dropdown Menu** - Navbar uchun
8. ⏳ **Tabs** - Tab navigation uchun

---

## 📚 Qo'shimcha Ma'lumot:

- **Rasmiy Dokumentatsiya:** https://ui.shadcn.com
- **Komponentlar Ro'yxati:** https://ui.shadcn.com/docs/components
- **Tailwind CSS:** https://tailwindcss.com
- **Radix UI:** https://www.radix-ui.com

---

## 💡 Maslahatlar:

1. **Ranglarni o'zgartirish:** `src/index.css` da CSS variables ni tahrirlang
2. **Yangi komponent qo'shish:** `npx shadcn@latest add [component-name]`
3. **Custom styling:** `className` prop orqali Tailwind klasslar qo'shing
4. **Dark mode:** `tailwind.config.js` da `darkMode: ["class"]` allaqachon sozlangan

---

**Muallif:** Shadcn/ui + Custom Integration
**Sana:** 2025-11-01

