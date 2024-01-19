import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is a required.'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters.')
    .required('Password is a required.'),
});
