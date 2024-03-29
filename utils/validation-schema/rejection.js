import * as yup from 'yup';

export const rejectionSchema = yup.object().shape({
  reason: yup
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters.')
    .max(50, 'Must be at most 50 characters.')
    .required('Remarks is required.'),
});
