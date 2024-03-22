import api from './api';

export const checkEmail = (email) => {
  return api.get(`/api/auth/check-email?email=${email}`);
};

export const login = (payload) => {
  return api.post(`/api/login/admin`, payload);
};
