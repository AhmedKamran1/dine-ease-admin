import api from './api';
import { PORTS } from '@/utils/port';

const service = 'restaurant';
const port = PORTS[service];

export const getApprovedRestaurants = () => {
  return api.get(`http://localhost:${port}/api/${service}/approved`);
};

export const getAllRestaurants = () => {
  return api.get(`http://localhost:${port}/api/${service}/all`);
};

export const getPendingRestaurants = () => {
  return api.get(`http://localhost:${port}/api/${service}/pending`);
};
