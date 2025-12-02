/**
 * Home Page API
 * Bosh sahifadagi bo'limlar uchun ma'lumotlarni taqdim etadi.
 * Hozircha mock ma'lumotlar ishlatilmoqda.
 */

import { cacheManager } from '@/utils/cacheManager';

// Helper function to simulate network delay
const simulateApiCall = <T>(data: T, delay = 300): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};
