import api from './api';
import { PORTS } from '@/utils/port';

const service = 'restaurant';
const port = PORTS[service];

export const getAllRecords = () => {
  return api.get(`http://localhost:${port}/api/${service}/records/all`);
};

export const getAllRestaurants = () => {
  return api.get(`http://localhost:${port}/api/${service}/all`);
};

export const restaurantStatusUpdate = (id, payload) => {
  return api.patch(`http://localhost:${port}/api/${service}/status/${id}`, payload);
};

export const deleteRestaurant = (id) => {
  return api.delete(`http://localhost:${port}/api/${service}/${id}`);
};

// Modify Requests

export const getAllModificationRequests = () => {
  return api.get(`http://localhost:${port}/api/${service}/modify/all`);
};

export const updateRequest = (restaurantId, payload) => {
  return api.patch(
    `http://localhost:${port}/api/${service}/request/${restaurantId}`,
    payload
  );
};

export const deleteRequest = (requestId) => {
  return api.delete(`http://localhost:${port}/api/${service}/modify/${requestId}`);
};
