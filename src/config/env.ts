/**
 * Environment Variables
 * .env faylidagi o'zgaruvchilarni boshqarish
 */

export const ENV = {
  // API
  API_URL: process.env.REACT_APP_API_BASE_URL || 'https://new.namdtu.uz/api',
  PROJECT_ID: process.env.REACT_APP_PROJECT_ID || '',

  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',

  // Analytics (optional)
  GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',

  // Feature Flags (optional)
  ENABLE_DARK_MODE: process.env.REACT_APP_ENABLE_DARK_MODE === 'true',
  ENABLE_I18N: process.env.REACT_APP_ENABLE_I18N !== 'false', // default true
} as const;

/**
 * Validate required environment variables
 */
export const validateEnv = () => {
  const required = ['REACT_APP_API_BASE_URL'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0 && ENV.IS_PROD) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
};

