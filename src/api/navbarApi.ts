export const navItems = [
    {
    title: 'Axborot xizmati',
    href: '/information-services',
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
      { title: 'Ustav', href: '/university-ustavi'},
      { title: 'Universitet kengashi', href: '/university-council' },
      { title: 'Jamoatchilik kengashi', href: '/public-council' },
      { title: 'Markazlar', href: '/centers' },
    ],
  },
  {
    title: 'Tuzilma',
    href: '/organizational-structure',
    children: [
      { title: 'Tashkiliy tuzilma', href: '/organizational-structure' },
      {
        title: 'Rahbariyat',
        href: '/leadership',
        children: [
          { title: 'Universitet rektori', href: '/leadership/rector' },
          { title: 'Yoshlar masalalari va manaviy marifiy ishlar bo\'yicha birinchi prorektor', href: '/leadership/youth-spiritual-vice-rector' },
          { title: 'Moliya-iqtisod bo\'yicha prorektor', href: '/leadership/finance-vice-rector' },
          { title: 'O\'quv ishlari bo\'yicha prorektor', href: '/leadership/academic-vice-rector' },
          { title: 'Xalqaro hamkorlik bo\'yicha prorektor', href: '/leadership/international-vice-rector' },
        ]
      },
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
      {
        title: 'Markazlar',
        href: '/centers',
        children: [
          { title: 'Raqamli ta\'lim texnologiyalari markazi', href: '/centers/digital-education' },
          { title: 'Axborot resurs markazi', href: '/centers/information-resource' },
        ]
      },
    ],
  },
  {
    title: 'Faoliyat',
    href: '/activities',
    children: [
      { title: 'Ilmiy tadqiqotlar', href: '/activities?category=scientific' },
      { title: 'Ta\'lim dasturlari', href: '/activities?category=educational' },
      { title: 'Xalqaro hamkorlik', href: '/activities?category=international' },
      { title: 'Ijtimoiy loyihalar', href: '/activities?category=social' },
      { title: 'Madaniy-sport tadbirlar', href: '/activities?category=cultural' },
      { title: 'Hamkorlik dasturlari', href: '/activities?category=partnership' },
    ],
  },
  {
    title: 'Qabul-2025',
    href: '/admission',
    children: [
      { title: 'Bakalavriat', href: '/admission/bachelor' },
      { title: 'Magistratura', href: '/admission/master' },
      { title: "Qo'shma ta'lim", href: '/admission/joint-program' },
      { title: 'Xorijiy fuqarolar uchun', href: '/admission/foreign' },
    ],
  },
  { title: 'Yashil universitet', href: '/yashil-universitet' },
  { title: 'Ekafaol talabalar', href: '/eco-active-students' },
];

export const socialLinks = [
    { name: 'Facebook', href: '#', iconD: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
    { name: 'Instagram', href: '#', iconD: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" },
    { name: 'Telegram', href: '#', iconD: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
    { name: 'YouTube', href: '#', iconD: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

export const quickLinks = [
    { title: 'Korrupsiyaga qarshi kurashish', href: '#' },
];

export const newsItems = [
  { 
    id: 1, 
    text: 'Qishki qabul-2024 jarayonlari boshlandi!',
    date: '2024-07-20',
    description: 'Barcha abituriyentlar diqqatiga! 2024-2025 o\\\'quv yili uchun qishki qabul jarayonlari boshlandi.',
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
    description: 'Iqtidorli talabalar uchun maxsus grant tanlovi e\\\'lon qilindi. Shoshiling!',
    image: 'https://picsum.photos/seed/picsum4/800/600'
  },
  { 
    id: 5, 
    text: "Yangi o'quv yili uchun dars jadvallari tasdiqlandi.",
    date: '2024-07-16',
    description: 'Barcha yo\\\'nalishlar uchun dars jadvallari bilan tanishishingiz mumkin.',
    image: 'https://picsum.photos/seed/picsum5/800/600'
  },
  { 
    id: 6, 
    text: "Kutubxonaga yangi kitoblar keltirildi.",
    date: '2024-07-15',
    description: 'Kutubxona fondi eng so\\\'nggi ilmiy va badiiy adabiyotlar bilan boyitildi.',
    image: 'https://picsum.photos/seed/picsum6/800/600'
  },
  { 
    id: 7, 
    text: "Onlayn ta'lim platformasi yangilandi.",
    date: '2024-07-14',
    description: 'Endi masofaviy ta\\\'lim yanada qulay va interaktiv bo\\\'ldi.',
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
    description: 'Tadbirga ko\\\'plab abituriyentlar va ularning ota-onalari tashrif buyurishdi.',
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


export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
}

// API chaqiruvini simulyatsiya qilamiz
export const fetchNavItems = async (): Promise<NavItem[]> => {
  // Bu yerda kelajakda haqiqiy API ga so'rov yuborilishi mumkin
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('NavItems loaded:', navItems); // Debug uchun
      resolve(navItems);
    }, 300); // Tarmoq kechikishini simulyatsiya qilish uchun
  });
};