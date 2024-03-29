import api from './api';

export const getAllRecords = () => {
  return api.get(`/api/restaurant/records/all`);
};

export const getAllRestaurants = () => {
  return api.get(`/api/restaurant/all`);
};

export const restaurantStatusUpdate = (id, payload) => {
  return api.patch(`/api/restaurant/status/${id}`, payload);
};

export const deleteRestaurant = (id) => {
  return api.delete(`/api/restaurant/${id}`);
};

// Modify Requests

export const getAllModificationRequests = () => {
  return api.get(`/api/restaurant/modify/all`);
};

export const updateRequest = (restaurantId, payload) => {
  return api.patch(`/api/restaurant/request/${restaurantId}`, payload);
};

export const deleteRequest = (requestId) => {
  return api.delete(`/api/restaurant/modify/${requestId}`);
};
