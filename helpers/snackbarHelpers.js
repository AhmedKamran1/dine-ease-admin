export const getError = (e) => {
  return e.response?.data?.message || 'Server Error, try again later ';
};
