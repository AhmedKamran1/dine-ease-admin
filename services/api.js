import axios from 'axios';

export const buildClient = () => {
  if (typeof window === 'undefined') {
    // We are on server
    const baseURL = 'http://ingress-nginx-controller.ingress-nginx';
    return axios.create({ baseURL, headers: { Host: 'dine-ease.dev' } });
  } else {
    // We must be on the browser
    return axios.create({ baseURL: '/' });
  }
};

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