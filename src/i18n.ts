import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const i18n = i18next;

// URL va localStorage'dan tilni darhol aniqlash, bu komponent render bo'lmasidan oldin ishlaydi
// va sahifaning 2 marta ("double-load") yuklanishini to'xtatadi.
const path = window.location.pathname;
const firstSegment = path.split('/')[1];
const urlLang = ['uz', 'ru', 'en'].includes(firstSegment) ? firstSegment : null;
const savedLang = localStorage.getItem('locale');
const initialLang = urlLang || savedLang || 'uz';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: initialLang, // Boshlang'ich tilni majburan o'rnatish
    fallbackLng: 'uz',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'pages', 'nav'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;