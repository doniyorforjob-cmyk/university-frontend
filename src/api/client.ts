import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'project-id': process.env.REACT_APP_PROJECT_ID,
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('authToken');
    const globalToken = process.env.REACT_APP_API_TOKEN;
    const locale = localStorage.getItem('locale') || 'en'; // Default to 'en' since backend has only English content

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else if (globalToken) {
      config.headers.Authorization = `Bearer ${globalToken}`;
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Retry logic configs
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Agar config bo'lmasa yoki retry count tugagan bo'lsa
    if (!config || config.__retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    // Faqat 5xx xatolar yoki tarmoq xatosi bo'lsa qayta urinib ko'rish
    if (error.response && error.response.status < 500) {
      return Promise.reject(error);
    }

    // Retry countni oshirish
    config.__retryCount = (config.__retryCount || 0) + 1;

    // Backoff delay
    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, RETRY_DELAY * config.__retryCount); // 1s, 2s, 3s
    });

    await backoff;
    console.log(`Retrying request (${config.__retryCount}/${MAX_RETRIES}):`, config.url);
    return apiClient(config);
  }
);

export default apiClient;