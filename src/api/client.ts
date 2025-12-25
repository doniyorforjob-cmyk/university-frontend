import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'project-id': process.env.REACT_APP_PROJECT_ID,
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
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;