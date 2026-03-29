import { AdmissionEntry } from '../http/admission.http';

/**
 * Mock API - Qabul ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * ContentBuilder bloklar bilan qabul ma'lumotlarini olish
 */
export const fetchAdmissionData = async (): Promise<AdmissionEntry | null> => {
  try {
    const admissionYear = new Date().getFullYear() + 1;

    const mockData: AdmissionEntry = {
      id: 'mock-admission-1',
      slug: 'qabul',
      title: `Qabul ${admissionYear}`,
      content: `<h3>${admissionYear}/${admissionYear + 1} O'quv Yili Qabul Jarayoni</h3>
<p>NAMDTU ga qabul jarayoni boshlandi. Batafsil ma'lumot uchun hujjatlarni yuklab oling.</p>`,
      image_url: 'https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?q=80&w=2070&auto=format&fit=crop',
      files: [
        {
          name: 'Qabul tartibi',
          url: '#',
          ext: 'pdf',
          size: 1024 * 500
        }
      ]
    };

    return simulateApiCall(mockData, 300);
  } catch (error) {
    console.error('Qabul ma\'lumotlarini yuklashda xatolik:', error);
    return null;
  }
};
