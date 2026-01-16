/**
 * Organizational Structure API
 * Tashkiliy tuzilma sahifasi uchun ma'lumotlarni taqdim etadi
 * universityContentApi.ts ga o'xshab API ga tayyorlangan
 */

import { OrganizationalMember, OrganizationalStructure, OrganizationalStructureDoc } from '../../types/organizationalStructure.types';

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
 * Tashkiliy tuzilma ma'lumotlarini olish (Mock)
 */
export const fetchOrganizationalStructureData = async (): Promise<OrganizationalStructureDoc | null> => {
  try {
    const mockData: OrganizationalStructureDoc = {
      title: "Namangan davlat texnika universiteti tashkiliy tuzilmasi",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Fayl URL (mock)
    };

    return simulateApiCall(mockData, 300);
  } catch (error) {
    console.error('Tashkiliy tuzilma ma\'lumotlarini yuklashda xatolik:', error);
    return null;
  }
};