import api from './api';
import { PORTS } from '@/utils/port';

const service = 'restaurant';
const port = PORTS[service];

export const getAllRestaurants = () => {
  return api.get(`http://localhost:${port}/api/${service}/all`);
};

export const restaurantStatusUpdate = (id, payload) => {
  return api.patch(`http://localhost:${port}/api/${service}/status/${id}`, payload);
};

export const deleteRestaurant = (id) => {
  return api.delete(`http://localhost:${port}/api/${service}/${id}`);
};
