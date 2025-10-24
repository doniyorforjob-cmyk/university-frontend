import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-base-url.com/api', // Haqiqiy API manzilini shu yerga yozing
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;