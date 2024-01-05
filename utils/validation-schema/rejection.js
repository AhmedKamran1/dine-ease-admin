import * as yup from 'yup';

export const rejectionSchema = yup.object().shape({
  reason: yup.string().required('Please provide rejection reason.'),
});
