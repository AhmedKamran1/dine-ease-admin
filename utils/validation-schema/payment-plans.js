import * as yup from 'yup';

export const planSchema = yup.object().shape({
  // title: yup
  //   .string()
  //   .trim()
  //   .min(3, 'Must be at least 3 characters.')
  //   .max(30, 'Must be at most 30 characters.')
  //   .required('Title is required.'),
  // description: yup
  //   .string()
  //   .trim()
  //   .min(10, 'Must be at least 10 characters.')
  //   .max(70, 'Must be at most 70 characters.')
  //   .required('Description is required.'),
  charges: yup
    .number()
    .positive('Price must be a positive value')
    .min(10, 'Price must be at least 10')
    .max(100, 'Price must be at most 100')
    .integer('Price must be an integer')
    .required('Price is required'),
  durationInMonths: yup
    .number()
    .positive('Duration must be a positive value')
    .min(1, 'Duration must be at least 1 month')
    .max(12, 'Duration must be at most 12 months')
    .integer('Duration must be an integer')
    .required('Duration is required'),
});
