import axios from 'axios';

import { getToken, clearToken } from '@/utils/storage';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: false,
});

// Request interceptor and attach JWT
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor and handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  },
);
export default api;
