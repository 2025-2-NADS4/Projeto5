// Em um arquivo como src/services/api.js ou src/config/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000'
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ou sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;