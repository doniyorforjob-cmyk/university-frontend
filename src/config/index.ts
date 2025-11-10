// src/config/index.ts
export const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  useMockData: process.env.REACT_APP_USE_MOCK_DATA !== 'false', // default: true
};
/**
 * Config Barrel Export
 * Barcha config fayllarini bir joydan export qilish
 */

export * from './constants';
export * from './routes';
export * from './env';

