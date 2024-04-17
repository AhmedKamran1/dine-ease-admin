import api from './api';
import { PORTS } from '@/utils/port';

const service = 'subscription';
const port = PORTS[service];

export const getAllSubscriptions = () => {
  return api.get(`http://localhost:${port}/api/${service}`);
};

export const getAllPlans = () => {
  return api.get(`http://localhost:${port}/api/plan`);
};

export const addPlan = (payload) => {
  return api.post(`http://localhost:${port}/api/plan`, payload);
};

export const updatePlan = (planId, payload) => {
  return api.patch(`http://localhost:${port}/api/plan/${planId}`, payload);
};

export const deletePlan = (planId) => {
  return api.delete(`http://localhost:${port}/api/plan/${planId}`);
};
