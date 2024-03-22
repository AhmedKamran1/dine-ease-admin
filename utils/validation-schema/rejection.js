import * as yup from 'yup';

export const rejectionSchema = yup.object().shape({
  reason: yup
    .string()
    .min(3, 'Must be at least 3 characters.')
    .max(50, 'Must be at most 50 characters.')
    .matches(/^[a-zA-Z]+$/, 'Remarks should only contain letters.')
    .required('Remarks is required.'),
});
