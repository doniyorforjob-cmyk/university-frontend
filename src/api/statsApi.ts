import { Stat } from '../types/stat';

// Bu ma'lumotlar aslida backenddan kelishi kerak
const statsData: Stat[] = [
  { id: 1, icon: 'AcademicCapIcon', end: 10000, text: 'Talabalar', plus: true },
  { id: 2, icon: 'UserGroupIcon', end: 800, text: "Professor-o‘qituvchilar", plus: true },
  { id: 3, icon: 'BuildingOfficeIcon', end: 10, text: 'Fakultetlar', plus: true },
  { id: 4, icon: 'UserPlusIcon', end: 50000, text: 'Bitiruvchilar', plus: true },
  { id: 5, icon: 'TrophyIcon', end: 150, text: 'Ilmiy darajalar', plus: true },
];

export const fetchStats = (): Promise<Stat[]> => {
  return new Promise((resolve) => {
    // Tarmoq kechikishini simulyatsiya qilish
    setTimeout(() => {
      resolve(statsData);
    }, 500);
  });
};