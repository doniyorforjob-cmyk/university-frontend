import { Department } from '../../types/structure.types';

const mockStructureData: Department[] = [
  {
    id: 1,
    title: 'Rektorat',
    members: [
      {
        id: 101,
        name: 'Tursunov Muxriddin Madaminovich',
        position: 'Rektor',
        imageUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=Rektor',
        phone: '+998 78 123-45-67',
        email: 'rektor@namdti.uz',
      },
    ],
  },
  {
    id: 2,
    title: 'O‘quv ishlari bo‘yicha prorektorat',
    members: [
      {
        id: 201,
        name: 'Ismoilov Zafar Zokirovich',
        position: 'O‘quv ishlari bo‘yicha prorektor',
        imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Prorektor',
        phone: '+998 78 123-45-68',
        email: 'prorektor.uquv@namdti.uz',
      },
      {
        id: 202,
        name: 'Aliyev Valijon Vahobovich',
        position: 'O‘quv-uslubiy boshqarma boshlig‘i',
        imageUrl: 'https://via.placeholder.com/150/008000/FFFFFF?Text=Boshliq',
        phone: '+998 78 123-45-69',
        email: 'uub@namdti.uz',
      },
    ],
  },
  {
    id: 3,
    title: 'Ilmiy ishlar va innovatsiyalar bo‘yicha prorektorat',
    members: [
      {
        id: 301,
        name: 'Baratov Ravshanbek Rustamovich',
        position: 'Ilmiy ishlar va innovatsiyalar bo‘yicha prorektor',
        imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=Prorektor',
        phone: '+998 78 123-45-70',
        email: 'prorektor.ilmiy@namdti.uz',
      },
    ],
  },
];

export const fetchStructureData = async (): Promise<Department[]> => {
  console.log('Fetching structure data...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Structure data fetched:', mockStructureData);
  return mockStructureData;
};