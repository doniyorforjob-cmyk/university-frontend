import axios from 'axios';
import { cacheManager } from '../utils/cacheManager';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'project-id': process.env.REACT_APP_PROJECT_ID,
    'Accept': 'application/json',
  },
});

// Response interceptors are handled below in the retry/logging section

apiClient.interceptors.request.use(
  (config) => {
    // Tagging logic for Global SWR
    const pendingCacheKey = cacheManager.consumeNextRequestKey();
    if (pendingCacheKey && config.method === 'get') {
      (config as any)._cacheKey = pendingCacheKey;
    }

    const projectId = process.env.REACT_APP_PROJECT_ID;
    const userToken = localStorage.getItem('authToken');
    const globalToken = process.env.REACT_APP_API_TOKEN;
    const locale = localStorage.getItem('locale') || 'uz';

    // ALWAYS ensure project-id is in the headers
    if (projectId) {
      config.headers['project-id'] = projectId;
      // Some backends might look for Project-Id or X-Project-Id, adding standard variants just in case
      config.headers['Project-Id'] = projectId;
    }

    // Always set Authorization if available
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else if (globalToken) {
      config.headers.Authorization = `Bearer ${globalToken}`;
    }

    // For POST/PUT requests, ensure Content-Type is set if not already (Axios usually does this, but being explicit)
    if (config.method !== 'get' && !config.headers['Content-Type'] && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    // Add locale parameter to all requests if not provided
    if (config.params) {
      if (!config.params.locale) {
        config.params.locale = locale;
      }
    } else {
      config.params = { locale };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Retry and Error Logging Logic
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // DETAILED ERROR LOGGING for debugging
    if (error.response) {
      console.error('API Error Response:', {
        url: config?.url,
        method: config?.method,
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('API Error Request (No response):', error.request);
    } else {
      console.error('API Error Message:', error.message);
    }

    // Skip retry if config missing or retry count reached
    if (!config || config.__retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    // Only retry on network errors or 5xx server errors
    if (error.response && error.response.status < 500) {
      return Promise.reject(error);
    }

    config.__retryCount = (config.__retryCount || 0) + 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, RETRY_DELAY * config.__retryCount);
    });

    await backoff;
    console.log(`Retrying request (${config.__retryCount}/${MAX_RETRIES}):`, config.url);
    return apiClient(config);
  }
);

export default apiClient;