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

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else if (globalToken) {
      config.headers.Authorization = `Bearer ${globalToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;