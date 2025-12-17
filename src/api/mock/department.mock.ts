import { Department } from '../../types/department.types';

const departments: Department[] = [
  {
    id: 1,
    name: 'Axborot xizmati',
    head: 'John Doe',
    phone: '+998 71 234 56 78',
    email: 'axborot@namdti.uz',
  },
  {
    id: 2,
    name: 'O‘quv bo‘limi',
    head: 'Jane Smith',
    phone: '+998 71 234 56 79',
    email: 'uquv@namdti.uz',
  },
  {
    id: 3,
    name: 'Ilmiy bo‘lim',
    head: 'Peter Jones',
    phone: '+998 71 234 56 80',
    email: 'ilmiy@namdti.uz',
  },
];

export const getDepartments = async (): Promise<Department[]> => {
  console.log('Fetching departments...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Departments fetched:', departments);
      resolve(departments);
    }, 500);
  });
};