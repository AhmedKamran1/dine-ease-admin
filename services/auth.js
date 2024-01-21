import api from './api';
import { PORTS } from '@/utils/port';

const service = 'auth';
const port = PORTS[service];

const service2 = 'users-aggregate';
const port2 = PORTS[service2];

export const checkEmail = (email) => {
  return api.get(`http://localhost:${port}/api/${service}/check-email?email=${email}`);
};

export const login = (payload) => {
  return api.post(`http://localhost:${port2}/api/${service2}/admin/login`, payload);
};
