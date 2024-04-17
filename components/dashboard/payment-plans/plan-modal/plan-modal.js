import React from 'react';
import { useFormik } from 'formik';

// Styles
import * as Styles from './plan-modal.styles';
import { FormControl, IconButton, InputAdornment, MenuItem, Modal } from '@mui/material';
import { InputField, PrimaryButton, SelectField, Text } from '@/components/UI';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Utils
import { planSchema } from '@/utils/validation-schema/payment-plans';

const PlanModal = ({
  plan,
  showModal,
  handleCloseModal,
  addPlanHandler,
  updatePlanHandler,
}) => {
  const submitHandler = async (values) => {
    formik.setSubmitting(true);
    if (plan) {
      await updatePlanHandler(values);
    } else {
      await addPlanHandler(values);
    }
    formik.setSubmitting(false);
    handleCloseModal();
  };

  const formik = useFormik({
    initialValues: {
      charges: plan?.charges || '',
      durationInMonths: plan?.durationInMonths || '',
    },
    validationSchema: planSchema,
    onSubmit: submitHandler,
  });

  const durations = [1, 3, 6, 12];

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Styles.ModalContainer component="form" onSubmit={formik.handleSubmit}>
        <IconButton
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={handleCloseModal}
        >
          <CloseIcon color="secondary" fontSize="medium" />
        </IconButton>
        <Text variant="subHeader" fontWeight={800} mb={1.5}>
          Plan Details
        </Text>
        <InputField
          name="charges"
          label="Charges"
          variant="outlined"
          placeholder="Enter Charges"
          type="number"
          value={formik.values.charges}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.charges && Boolean(formik.touched.charges)}
          helperText={formik.touched.charges && formik.errors.charges}
          InputProps={{
            startAdornment: <InputAdornment position="start">US$</InputAdornment>,
          }}
        />

        <FormControl
          sx={{ width: '100%' }}
          error={
            formik.errors.durationInMonths && Boolean(formik.touched.durationInMonths)
          }
        >
          <SelectField
            name="durationInMonths"
            variant="outlined"
            displayEmpty
            value={formik.values.durationInMonths}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem disabled value="">
              <Text variant="body" color="text.secondary">
                Select Duration
              </Text>
            </MenuItem>
            {durations.map((duration) => (
              <MenuItem value={duration} key={duration}>
                <Text variant="body" color="text.secondary">
                  {duration} Month
                </Text>
              </MenuItem>
            ))}
          </SelectField>
          {formik.touched.durationInMonths && formik.errors.durationInMonths && (
            <Text variant="sub" color="error">
              {formik.errors.durationInMonths}
            </Text>
          )}
        </FormControl>
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          <Text variant="body">Save Changes</Text>
        </PrimaryButton>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default PlanModal;
