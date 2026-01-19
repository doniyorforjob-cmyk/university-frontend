import { ActivityPageData } from '../../types/activities.types';

/**
 * Mock API - Faoliyat ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const fetchActivitiesData = async (): Promise<ActivityPageData | null> => {
  const mockData: ActivityPageData = {
    id: 'mock-activities',
    title: "Namangan davlat universiteti faoliyat yo'nalishlari",
    content: "Namangan davlat universiteti o'zining ko'p yillik tarixi va an'analariga ega bo'lib, bugungi kunda ta'lim, fan, yoshlar siyosati va xalqaro hamkorlik sohalarida faol ish olib bormoqda.",
    categories: ["O'quv", "Ilmiy", "Xalqaro", "Yoshlar"],
    icons_json: {
      "O'quv": {
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"text-blue-600\"><path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"/><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"/></svg>",
        "label": "O'quv-uslubiy faoliyat",
        "description": "Zamonaviy ta'lim standartlari, dars jadvallari va o'quv dasturlarini joriy etish."
      },
      "Ilmiy": {
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"text-emerald-600\"><path d=\"M6 18h8\"/><path d=\"M3 22h18\"/><path d=\"M14 22a7 7 0 1 0 0-14h-1\"/><path d=\"M9 14h2\"/><path d=\"M9 12a2 2 0 1 1-4 0V7a2 2 0 1 1 4 0v5Z\"/></svg>",
        "label": "Ilmiy-tadqiqot va innovatsiyalar",
        "description": "Ilmiy grantlar, startap loyihalar va xalqaro jurnallarda maqolalar chop etish."
      },
      "Xalqaro": {
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"text-indigo-600\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/></svg>",
        "label": "Xalqaro hamkorlik",
        "description": "Xorijiy universitetlar bilan almashinuv dasturlari va qo'shma ta'lim loyihalari."
      },
      "Yoshlar": {
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"text-orange-600\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg>",
        "label": "Yoshlar va ma'naviyat",
        "description": "Talabalar hayoti, to'garaklar va ma'naviy-ma'rifiy tadbirlar tashkil etish."
      }
    }
  };

  return simulateApiCall(mockData, 300);
};
