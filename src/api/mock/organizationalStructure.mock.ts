/**
 * Organizational Structure API
 * Tashkiliy tuzilma sahifasi uchun ma'lumotlarni taqdim etadi
 * universityContentApi.ts ga o'xshab API ga tayyorlangan
 */

import { ContentBlock } from '../../components/shared/ContentBuilder';
import { OrganizationalMember, OrganizationalStructure } from '../../types/organizationalStructure.types';


/**
 * OrganizationalStructure ma'lumotlarini ContentBlock[] ga o'zgartiradi
 * Custom component uchun tayyor ma'lumotlarni qaytaradi
 *
 * @param {OrganizationalStructure} structure - API dan kelgan tashkiliy tuzilma ma'lumotlari
 * @returns {ContentBlock[]} ContentBuilder uchun tayyor bloklar
 */
export const transformOrganizationalStructureToBlocks = (
  structure: OrganizationalStructure
): ContentBlock[] => {
  return [
    {
      id: 'structure-tree',
      type: 'dynamic-data',
      data: {
        component: 'OrganizationalStructureTree',
        props: { structure }
      },
    },
  ];
};

/**
 * Mock API - Tashkiliy tuzilma ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * ContentBuilder bloklar bilan tashkiliy tuzilma ma'lumotlarini olish
 */
export const fetchOrganizationalStructureData = async (): Promise<{ blocks: ContentBlock[] }> => {
  try {
    // Haqiqiy API chaqiruvi (Backend tayyor bo'lganda)
    // const response = await apiClient.get('/organizational-structure');
    // const structure = response.data;

    // Mock data
    const mockStructure: OrganizationalStructure = {
      rector: {
        id: 'rector-1',
        name: 'Tursunov Muxriddin Madaminovich',
        position: 'Rektor',
        type: 'rector',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      },
      prorektors: [
        {
          id: 'prorector-1',
          name: 'Ismoilov Zafar Zokirovich',
          position: "O'quv ishlari bo'yicha prorektor",
          type: 'prorector',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'prorector-2',
          name: 'Baratov Ravshanbek Rustamovich',
          position: "Ilmiy ishlar va innovatsiyalar bo'yicha prorektor",
          type: 'prorector',
          imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'prorector-3',
          name: 'Karimov Shuxrat Shavkatovich',
          position: "Ma'naviy-ma'rifiy ishlar bo'yicha prorektor",
          type: 'prorector',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
      ],
      dekans: [
        {
          id: 'dekan-1',
          name: 'Akbarov Dilshod',
          position: 'Dekan',
          type: 'dekan',
          faculty: 'Muhandislik va texnologiya fakulteti',
          imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'dekan-2',
          name: 'Rustamova Gulnora',
          position: 'Dekan',
          type: 'dekan',
          faculty: 'Axborot texnologiyalari fakulteti',
          imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'dekan-3',
          name: 'Karimov Asilbek',
          position: 'Dekan',
          type: 'dekan',
          faculty: 'Iqtisodiyot va menejment fakulteti',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'dekan-4',
          name: 'Toshmatova Dilnoza',
          position: 'Dekan',
          type: 'dekan',
          faculty: 'Qurilish va arxitektura fakulteti',
          imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'dekan-5',
          name: 'Sultonov Farrux',
          position: 'Dekan',
          type: 'dekan',
          faculty: 'Elektrotexnika va energetika fakulteti',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'dekan-6',
          name: 'Mahmudova Nilufar',
          position: 'Dekan',
          type: 'dekan',
          faculty: "Tayyorgarlik va malaka oshirish fakulteti",
          imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
      ],
      kafedras: [
        { id: 'kafedra-1', name: 'Prof. Dr. Olimov O.', position: 'Mudir', type: 'kafedra_head', faculty: 'Matematika va fizika', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-2', name: 'Prof. Dr. Saidova S.', position: 'Mudir', type: 'kafedra_head', faculty: "Dasturiy ta'minot muhandisligi", imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-3', name: 'Dots. Karimov K.', position: 'Mudir', type: 'kafedra_head', faculty: 'Kompyuter tizimlari', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-4', name: 'Prof. Dr. Tursunov T.', position: 'Mudir', type: 'kafedra_head', faculty: 'Muhandislik grafikasi', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-5', name: 'Dots. Rahimova R.', position: 'Mudir', type: 'kafedra_head', faculty: 'Elektronika va avtomatika', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-6', name: 'Prof. Dr. Xasanov X.', position: 'Mudir', type: 'kafedra_head', faculty: 'Iqtisodiyot', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-7', name: 'Dots. Yusupova Y.', position: 'Mudir', type: 'kafedra_head', faculty: 'Xorijiy tillar', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-8', name: 'Prof. Dr. Mahmudov M.', position: 'Mudir', type: 'kafedra_head', faculty: 'Tarix va falsafa', imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-9', name: 'Dots. Ismoilova I.', position: 'Mudir', type: 'kafedra_head', faculty: 'Kimyo va biologiya', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-10', name: 'Prof. Dr. Qodirov Q.', position: 'Mudir', type: 'kafedra_head', faculty: 'Mexanika', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-11', name: 'Prof. Dr. Sobirov S.', position: 'Mudir', type: 'kafedra_head', faculty: 'Energetika', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'kafedra-12', name: 'Dots. Hakimova H.', position: 'Mudir', type: 'kafedra_head', faculty: 'Qurilish materiallari', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      ],
      departments: [
        { id: 'dept-1', name: 'Azizova A.', position: 'Direktor', type: 'department_head', faculty: 'Axborot xizmatlari markazi', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-2', name: 'Boltayev B.', position: 'Mudir', type: 'department_head', faculty: 'Kutubxona', imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-3', name: 'Gulomova G.', position: 'Mudir', type: 'department_head', faculty: 'Sport majmualari', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-4', name: 'Davlatov D.', position: 'Mudir', type: 'department_head', faculty: 'Yotoqxonalar', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-5', name: 'Ergasheva E.', position: 'Direktor', type: 'department_head', faculty: "Raqamli ta'lim texnologiyalari markazi", imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-6', name: 'Fayziyev F.', position: 'Mudir', type: 'department_head', faculty: 'Axborot resurs markazi', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-7', name: 'Hasanova H.', position: 'Direktor', type: 'department_head', faculty: 'Innovatsiya markazi', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-8', name: 'Ibrohimov I.', position: 'Mudir', type: 'department_head', faculty: 'Xalqaro hamkorlik bo\'limi', imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-9', name: 'Jumayev J.', position: 'Mudir', type: 'department_head', faculty: 'Talabalar turar joylari', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-10', name: 'Komilova K.', position: 'Mudir', type: 'department_head', faculty: "O'quv-uslubiy bo'lim", imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-11', name: 'Latipov L.', position: "Boshlig'", type: 'department_head', faculty: 'Xavfsizlik xizmati', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { id: 'dept-12', name: 'Mirzayev M.', position: 'Bosh buxgalter', type: 'department_head', faculty: 'Buxgalteriya', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      ],
    };

    // Ma'lumotlarni ContentBlock[] ga o'zgartirish
    const blocks = transformOrganizationalStructureToBlocks(mockStructure);

    return simulateApiCall({ blocks }, 300);
  } catch (error) {
    console.error('Tashkiliy tuzilma ma\'lumotlarini yuklashda xatolik:', error);
    throw error;
  }
};