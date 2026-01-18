import { InformationServiceData } from '../../services/informationServicesService';

const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const fetchInformationServicesData = async (): Promise<InformationServiceData> => {
  const data: InformationServiceData = {
    title: {
      uz: 'Axborot xizmatlari',
      ru: 'Информационные службы',
      en: 'Information Services'
    },
    description: {
      uz: '<p>NamDTU Axborot Xizmatlari Markazi talabalar va xodimlar uchun keng ko\'lamli axborot xizmatlarini taqdim etadi.</p>',
      ru: '<p>Центр информационных служб НамИТИ предоставляет широкий спектр информационных услуг для студентов и сотрудников.</p>',
      en: '<p>NamITI Information Services Center provides a wide range of information services for students and staff.</p>'
    },
    banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    documents: [
      {
        name: { uz: 'Nizom', ru: 'Положение', en: 'Regulation' },
        file: 'https://example.com/doc1.pdf'
      }
    ]
  };

  return simulateApiCall(data, 500);
};
