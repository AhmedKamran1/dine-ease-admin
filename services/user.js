import api from './api';
import { PORTS } from '@/utils/port';

const service = 'user';
const port = PORTS[service];

export const getUsersCount = () => {
  return api.get(`http://localhost:${port}/api/${service}/count`);
};
