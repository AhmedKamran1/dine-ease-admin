import axios from 'axios';

const api = axios.create({ baseURL: '/', timeout: 5000 });

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (error) => {
    if (error.response && error.response.data.message === 'jwt expired') {
      localStorage.clear();
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
