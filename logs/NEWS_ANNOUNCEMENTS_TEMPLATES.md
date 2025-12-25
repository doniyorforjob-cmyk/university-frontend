# News & Announcements Pages - SectionTemplate & DetailTemplate

## 📋 Umumiy Ko'rinish

News va Announcements sahifalari **SectionTemplate** pattern ishlatadi.
NewsDetail sahifasi **DetailTemplate** pattern ishlatadi.

---

## 🏗️ Arxitektura

### **News/Announcements Pages**

```
API (postsApi.ts / announcementApi.ts)
    ↓
Post[] / Announcement[]
    ↓
SectionItem[] (o'zgartirish)
    ↓
SectionTemplate
    ↓
UI (Grid layout + Pagination)
```

### **NewsDetail Page**

```
API (postsApi.ts)
    ↓
PostDetail
    ↓
DetailMeta (o'zgartirish)
    ↓
DetailTemplate
    ↓
UI (Hero image + Content + Social share)
```

---

## 📁 Fayllar

### **1. News Page** - `src/pages/News/index.tsx`

**Xususiyatlari:**
- ✅ SectionTemplate ishlatadi
- ✅ getPosts('news') API chaqiradi
- ✅ Post[] → SectionItem[] o'zgartiriladi
- ✅ Grid layout
- ✅ Pagination
- ✅ Search
- ✅ Sorting

**Props:**
```typescript
<SectionTemplate
  parentTitle="Axborot xizmati"
  sectionTitle="Yangiliklar"
  sectionType="news"
  items={items}
  layoutType="grid"
  itemsPerPage={12}
  showSearch={true}
  showPagination={true}
  showSorting={true}
  showSidebar={true}
  onItemClick={(item) => navigate(item.href)}
/>
```

---

### **2. Announcements Page** - `src/pages/Announcements/index.tsx`

**Xususiyatlari:**
- ✅ SectionTemplate ishlatadi
- ✅ getAnnouncements() API chaqiradi
- ✅ Announcement[] → SectionItem[] o'zgartiriladi
- ✅ Grid layout
- ✅ Pagination
- ✅ Search
- ✅ Sorting

**Props:**
```typescript
<SectionTemplate
  parentTitle="Axborot xizmati"
  sectionTitle="E'lonlar"
  sectionType="announcements"
  items={items}
  layoutType="grid"
  itemsPerPage={12}
  showSearch={true}
  showPagination={true}
  showSorting={true}
  showSidebar={true}
  onItemClick={(item) => navigate(item.href)}
/>
```

---

### **3. NewsDetail Page** - `src/pages/NewsDetail/index.tsx`

**Xususiyatlari:**
- ✅ DetailTemplate ishlatadi
- ✅ getPostBySlug(slug) API chaqiradi
- ✅ PostDetail ma'lumotlarini ko'rsatadi
- ✅ Hero image
- ✅ Meta information
- ✅ Social sharing
- ✅ Print button

**Props:**
```typescript
<DetailTemplate
  title={newsItem.title}
  contentType="news"
  heroImage={newsItem.image_url}
  content={newsItem.content}
  meta={meta}
  breadcrumbs={breadcrumbs}
  showMeta={true}
  showSocialShare={true}
  showPrintButton={true}
  socialShare={{
    facebook: true,
    telegram: true,
    copy: true
  }}
/>
```

---

## 🔄 Data Transformation

### **Post → SectionItem**

```typescript
const sectionItems: SectionItem[] = data.map((post: Post) => ({
  id: post.id.toString(),
  title: post.title,
  description: post.description,
  date: post.published_at,
  image: post.image_url,
  href: `/news/${post.slug}`,
  category: 'Yangilik'
}));
```

### **Announcement → SectionItem**

```typescript
const sectionItems: SectionItem[] = data.map((announcement: Announcement) => ({
  id: announcement.id.toString(),
  title: announcement.title,
  description: announcement.excerpt,
  date: announcement.published_at,
  image: announcement.image_url,
  href: `/announcements/${announcement.slug}`,
  category: 'E\'lon'
}));
```

### **PostDetail → DetailMeta**

```typescript
const meta: DetailMeta = {
  publishDate: newsItem.published_at,
  author: newsItem.author?.name,
  category: newsItem.category,
  views: newsItem.views
};
```

---

## 📊 SectionTemplate Features

| Feature | News | Announcements |
|---------|------|---------------|
| **Layout** | Grid | Grid |
| **Items Per Page** | 12 | 12 |
| **Search** | ✅ | ✅ |
| **Pagination** | ✅ | ✅ |
| **Sorting** | ✅ | ✅ |
| **Filters** | ❌ | ❌ |
| **Sidebar** | ✅ | ✅ |

---

## 📊 DetailTemplate Features

| Feature | NewsDetail |
|---------|-----------|
| **Hero Image** | ✅ |
| **Meta Info** | ✅ |
| **Social Share** | ✅ |
| **Print Button** | ✅ |
| **Related Items** | ❌ |
| **Comments** | ❌ |
| **Sidebar** | ✅ |

---

## 🎯 Foydalanish

### **News Sahifasi**

```
http://localhost:3000/news
```

**Features:**
- 12 ta yangilik grid layout
- Pagination
- Search
- Sorting (sana, nom, muhimlik)
- Sidebar

### **Announcements Sahifasi**

```
http://localhost:3000/announcements
```

**Features:**
- 12 ta e'lon grid layout
- Pagination
- Search
- Sorting (sana, nom, muhimlik)
- Sidebar

### **NewsDetail Sahifasi**

```
http://localhost:3000/news/{slug}
```

**Features:**
- Hero image
- Meta information (sana, muallif, kategoriya, ko'rishlar)
- Social sharing (Facebook, Telegram, Copy link)
- Print button
- Sidebar

---

## 🔧 Backend Integration

### **Hozir (Mock Data)**

```typescript
// postsApi.ts
export const getPosts = async (category?: PostCategory): Promise<Post[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockNews.map(p => ({...})));
    }, 500);
  });
};
```

### **Backend Tayyor Bo'lganda**

```typescript
// postsApi.ts
export const getPosts = async (category?: PostCategory): Promise<Post[]> => {
  try {
    const response = await apiClient.get('/posts', { params: { category } });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

---

## 📋 API Endpoints (Backend uchun)

### **News**

```
GET /posts?category=news
GET /posts/{slug}
```

### **Announcements**

```
GET /announcements
GET /announcements/{slug}
```

---

## ✨ Features

### **News/Announcements Pages**
- ✅ SectionTemplate pattern
- ✅ Grid layout
- ✅ Pagination
- ✅ Search
- ✅ Sorting
- ✅ Sidebar
- ✅ Loading skeleton
- ✅ Error handling
- ✅ Responsive design

### **NewsDetail Page**
- ✅ DetailTemplate pattern
- ✅ Hero image
- ✅ Meta information
- ✅ Social sharing
- ✅ Print button
- ✅ Breadcrumbs
- ✅ Loading skeleton
- ✅ Error handling
- ✅ Responsive design

---

## 🚀 Keyingi Qadamlar

1. ✅ University sahifasi - **TAYYOR**
2. ✅ Information Services sahifasi - **TAYYOR**
3. ✅ News/Announcements sahifalari - **TAYYOR**
4. ✅ NewsDetail sahifasi - **TAYYOR**
5. ⏳ Boshqa sahifalar → API integration
6. ⏳ Error Handling qo'shish
7. ⏳ ARIA Labels qo'shish
8. ⏳ Unit Tests yozish

---

**Muallif:** Development Team  
**Sana:** 2025-01-15  
**Versiya:** 1.0
