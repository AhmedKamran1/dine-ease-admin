import React from 'react';
import { useFormik } from 'formik';

// Styles
import * as Styles from './rejection-modal.styles';
import { Button, Modal } from '@mui/material';
import { InputField, ModalCancelIcon, Text } from '@/components/UI';

// Utils
import { rejectionSchema } from '@/utils/validation-schema/rejection';

// Icons
import CloseIcon from '@mui/icons-material/Close';

const RejectModal = ({ showModal, handleCloseModal, handleReject }) => {
  const submitHandler = async (values) => {
    formik.setSubmitting(true);
    values.reason = values.reason.trim();
    await handleReject(values.reason);
    formik.setSubmitting(false);
    handleCloseModal();
  };

  const formik = useFormik({
    initialValues: {
      reason: '',
    },
    validationSchema: rejectionSchema,
    onSubmit: submitHandler,
  });

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Styles.ModalContainer component="form" onSubmit={formik.handleSubmit}>
        <ModalCancelIcon onClick={handleCloseModal}>
          <CloseIcon color="secondary" fontSize="medium" />
        </ModalCancelIcon>
        <Text variant="subHeader" fontWeight={500}>
          Provide Rejection Reason
        </Text>
        <InputField
          name="reason"
          label="Reason"
          variant="outlined"
          placeholder="Enter Reason"
          value={formik.values.reason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.reason && Boolean(formik.touched.reason)}
          helperText={formik.touched.reason && formik.errors.reason}
          multiline
          minRows={3}
          maxRows={6}
        />
        <Button
          variant="contained"
          color="error"
          type="submit"
          disabled={formik.isSubmitting}
        >
          <Text variant="body" color="text.primary">
            Submit
          </Text>
        </Button>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default RejectModal;
