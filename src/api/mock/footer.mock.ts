import { FooterData } from '../../types/footer.types';

// Backend'dan kelishi kutilayotgan ma'lumotlar namunasi (mock)
const mockFooterData: FooterData = {
  contactInfo: {
    address: {
      text: "Namangan sh, Boburshox k, 1-uy",
      url: "https://www.google.com/maps/search/?api=1&query=Namangan+sh.,+Uychi+ko'chasi,+316-uy",
    },
    phone: {
      number: "+998 (69) 228-83-75",
      tel: "+998692288375",
    },
    email: {
      address: "info@namdu.uz",
      mailto: "mailto:info@namdu.uz",
    },
  },
  socialLinks: [
    { id: 'fb', name: 'Facebook', url: '/#' },
    { id: 'tg', name: 'Telegram', url: '/#' },
    { id: 'ig', name: 'Instagram', url: '/#' },
    { id: 'yt', name: 'YouTube', url: '/#' },
    { id: 'tw', name: 'Twitter', url: '/#' },
  ],
  linkGroups: [
    {
      id: 'quick-links',
      title: 'Tezkor havolalar',
      links: [
        { id: 'about', text: 'Universitet haqida', url: '/about' },
        { id: 'faculties', text: 'Fakultetlar', url: '/faculties' },
        { id: 'admission', text: 'Qabul', url: '/admission' },
        { id: 'news', text: 'Yangiliklar', url: '/news' },
      ],
    },
    {
      id: 'useful-links',
      title: 'Foydali havolalar',
      links: [
        { id: 'contact', text: 'Kontakt', url: '/#' },
        { id: 'faq', text: 'FAQ', url: '/#' },
        { id: 'live-chat', text: 'Live Chat', url: '/#' },
      ],
    },
    {
      id: 'legal',
      title: 'Huquqiy',
      links: [
        { id: 'privacy', text: 'Maxfiylik siyosati', url: '/privacy-policy' },
        { id: 'terms', text: 'Foydalanish shartlari', url: '/terms-of-use' },
        { id: 'return', text: 'Qaytarish siyosati', url: '/#' },
        { id: 'accessibility', text: 'Qulaylik', url: '/#' },
      ],
    },
  ],
};

// API so'rovini simulyatsiya qiluvchi funksiya
export const fetchFooterData = async (): Promise<FooterData> => {
  console.log('Fetching footer data...');
  // Tarmoq kechikishini simulyatsiya qilish uchun 500ms kutish
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Footer data fetched successfully.');
  return mockFooterData;
};