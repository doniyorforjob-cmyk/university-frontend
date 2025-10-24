import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Tarjimalarni serverdan yuklash uchun
  .use(LanguageDetector) // Brauzer tilini avtomatik aniqlash uchun
  .use(initReactI18next) // i18next'ni react bilan bog'lash uchun
  .init({
    supportedLngs: ['uz', 'ru', 'en'],
    fallbackLng: 'uz',
    debug: true, // Ishlab chiqish rejimida qo'shimcha ma'lumotlarni ko'rsatish
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Tarjima fayllarining yo'li
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;