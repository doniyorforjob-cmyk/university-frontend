import { YashilUniversitetEntry } from '../http/yashilUniversitet.http';

/**
 * Mock API - Yashil Universitet ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const fetchYashilUniversitetData = async (): Promise<YashilUniversitetEntry | null> => {
  console.warn('Yashil Universitet ma\'lumotlari uchun mock API dan foydalanilmoqda');

  const mockData: YashilUniversitetEntry = {
    id: 'mock-green-1',
    slug: 'yashil-universitet',
    title: 'Yashil Universitet',
    content: `
      <h2 class="text-3xl font-bold text-emerald-900 mb-6">NamDTU Ekologik Tashabbusi</h2>
      <p class="text-gray-700 text-lg leading-relaxed mb-6">
        Universitetimiz "Yashil Universitet" maqomini olish yo'lida faol harakat qilmoqda. Biz nafaqat ta'lim sifatini oshirish, balki atrof-muhitga bo'lgan ta'sirimizni kamaytirishni ham maqsad qilganmiz.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 class="text-xl font-bold text-emerald-800 mb-2">🌳 1200+ Daraxt</h3>
          <p class="text-emerald-700">Kampusimiz hududida so'nggi yillarda mingdan ortiq manzarali va mevali daraxtlar ekildi.</p>
        </div>
        <div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 class="text-xl font-bold text-emerald-800 mb-2">♻️ 80% Qayta ishlash</h3>
          <p class="text-emerald-700">Chiqindilarni saralash va qayta ishlash tizimi to'liq yo'lga qo'yilgan.</p>
        </div>
      </div>
    `,
    files: [
      {
        name: 'Ekologik strategiya 2026',
        url: '#',
        ext: 'pdf',
        size: 1024 * 750
      },
      {
        name: 'Yashil hudud xaritasi',
        url: '#',
        ext: 'jpg',
        size: 1024 * 1200
      }
    ]
  };

  return simulateApiCall(mockData, 300);
};