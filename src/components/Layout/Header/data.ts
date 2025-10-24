export const navItems = [
    {
    title: 'Axborot xizmati',
    children: [
      { title: 'Yangiliklar', href: '/news' },
      { title: "E'lonlar", href: '/announcements' },
      { title: 'OAV Biz haqimizda', href: '/media-about-us' },
      { title: 'Arizalar takliflar hamda shikoyatlar', href: '/appeals' },
      { title: 'Aloqa', href: '/contact' },
    ],
  },
  {
    title: 'Universitet',
    children: [
      { title: 'Universitet haqida', href: '/about' },
      { title: 'Rektorat', href: '/rectory' },
      { title: 'Tarix', href: '/history' },
      { title: 'Missiya va strategiya', href: '/mission' },
    ],
  },
  {
    title: 'Tuzilma',
    children: [
      { 
        title: 'Fakultetlar', 
        href: '/faculties',
        children: [
          { title: 'Muhandislik-texnologiya', href: '/faculties/engineering' },
          { title: 'Iqtisodiyot', href: '/faculties/economics' },
          { title: 'Qurilish', href: '/faculties/construction' },
        ]
      },
      { title: 'Kafedralar', href: '/departments' },
      { title: "Bo'limlar", href: '/sections' },
      { title: 'Markazlar', href: '/centers' },
    ],
  },
  {
    title: 'Faoliyat',
    children: [
      { title: 'Ilmiy faoliyat', href: '/scientific-activity' },
      { title: 'Xalqaro faoliyat', href: '/international-activity' },
      { title: 'Moliyaviy faoliyat', href: '/financial-activity' },
      { title: 'Yoshlar bilan ishlash', href: '/youth-work' },
    ],
  },
  {
    title: 'Qabul-2025',
    children: [
      { title: 'Bakalavriat', href: '/admission/bachelor' },
      { title: 'Magistratura', href: '/admission/master' },
      { title: "Qo'shma ta'lim", href: '/admission/joint-program' },
      { title: 'Xorijiy fuqarolar uchun', href: '/admission/foreign' },
    ],
  },
  { title: 'Yashil universitet', href: '/green-university' },
  { title: 'Ekafaol talabalar', href: '/eco-active-students' },
];

export const socialLinks = [
    { name: 'Facebook', href: '#', iconD: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
    { name: 'Instagram', href: '#', iconD: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" },
    { name: 'Telegram', href: '#', iconD: "M9.78 18.39c.29.29.77.29 1.06 0l1.42-1.42-1.06-1.06-1.42 1.42zm-2.83-2.83l-1.42 1.42c-.29.29-.29.77 0 1.06s.77.29 1.06 0l1.42-1.42-1.06-1.06zm11.31-5.66l-1.41-1.41-8.49 8.49 1.41 1.41 8.49-8.49zM22 2l-2.83 13.31c-.1.47-.5.79-.98.79-.2 0-.39-.06-.56-.19l-4.16-3.13-2.48 2.48c-.39.39-1.02.39-1.41 0l-2.12-2.12-4.24 3.18c-.49.37-1.18.2-1.5-.32s-.2-1.18.32-1.5l14-10c.38-.27.89-.15 1.16.23.27.38.15.89-.23 1.16z" },
];

export const quickLinks = [
    { title: 'Talabalar', href: '#' },
    { title: 'Xodimlar', href: '#' },
    { title: 'Davlat ramzlari', href: '#' },
];

export const newsItems = [
  { 
    id: 1, 
    text: 'Qishki qabul-2024 jarayonlari boshlandi!',
    date: '2024-07-20',
    description: 'Barcha abituriyentlar diqqatiga! 2024-2025 o\'quv yili uchun qishki qabul jarayonlari boshlandi.',
    image: 'https://picsum.photos/seed/picsum1/800/600'
  },
  { 
    id: 2, 
    text: 'Universitetda yangi sport majmuasi ochildi.',
    date: '2024-07-19',
    description: 'Talabalarimiz uchun zamonaviy sport majmuasi foydalanishga topshirildi.',
    image: 'https://picsum.photos/seed/picsum2/800/600'
  },
  { 
    id: 3, 
    text: "Xalqaro anjuman o'tkazilishi rejalashtirilmoqda.",
    date: '2024-07-18',
    description: 'Anjumanda dunyoning yetakchi olimlari ishtirok etishi kutilmoqda.',
    image: 'https://picsum.photos/seed/picsum3/800/600'
  },
  { 
    id: 4, 
    text: "Talabalar uchun grant tanlovi e'lon qilindi.",
    date: '2024-07-17',
    description: 'Iqtidorli talabalar uchun maxsus grant tanlovi e\'lon qilindi. Shoshiling!',
    image: 'https://picsum.photos/seed/picsum4/800/600'
  },
  { 
    id: 5, 
    text: "Yangi o'quv yili uchun dars jadvallari tasdiqlandi.",
    date: '2024-07-16',
    description: 'Barcha yo\'nalishlar uchun dars jadvallari bilan tanishishingiz mumkin.',
    image: 'https://picsum.photos/seed/picsum5/800/600'
  },
  { 
    id: 6, 
    text: "Kutubxonaga yangi kitoblar keltirildi.",
    date: '2024-07-15',
    description: 'Kutubxona fondi eng so\'nggi ilmiy va badiiy adabiyotlar bilan boyitildi.',
    image: 'https://picsum.photos/seed/picsum6/800/600'
  },
  { 
    id: 7, 
    text: "Onlayn ta'lim platformasi yangilandi.",
    date: '2024-07-14',
    description: 'Endi masofaviy ta\'lim yanada qulay va interaktiv bo\'ldi.',
    image: 'https://picsum.photos/seed/picsum7/800/600'
  },
  { 
    id: 8, 
    text: "Talabalar teatr studiyasi yangi spektakl taqdim etdi.",
    date: '2024-07-13',
    description: 'Spektakl tomoshabinlar tomonidan yuqori baholandi.',
    image: 'https://picsum.photos/seed/picsum8/800/600'
  },
  { 
    id: 9, 
    text: "Robototexnika to'garagi a'zolari respublika tanlovida g'olib bo'lishdi.",
    date: '2024-07-12',
    description: 'Jamoamizni ushbu yuksak natija bilan tabriklaymiz!',
    image: 'https://picsum.photos/seed/picsum9/800/600'
  },
  { 
    id: 10, 
    text: "Universitetda 'Ochiq eshiklar kuni' bo'lib o'tdi.",
    date: '2024-07-11',
    description: 'Tadbirga ko\'plab abituriyentlar va ularning ota-onalari tashrif buyurishdi.',
    image: 'https://picsum.photos/seed/picsum10/800/600'
  },
  { 
    id: 11, 
    text: "Bitiruvchilarni taqdirlash marosimi bo'lib o'tdi.",
    date: '2024-07-10',
    description: 'Barcha bitiruvchilarga kelgusi ishlarida omad tilaymiz!',
    image: 'https://picsum.photos/seed/picsum11/800/600'
  },
];