import React from 'react';
import { useFormik } from 'formik';

// Styles
import * as Styles from './rejection-modal.styles';
import { Modal } from '@mui/material';
import { InputField, ModalCancelIcon, PrimaryButton, Text } from '@/components/UI';

// Utils
import { rejectionSchema } from '@/utils/validation-schema/rejection';

// Icons
import CloseIcon from '@mui/icons-material/Close';

const RejectModal = ({ showModal, handleCloseModal, handleReject }) => {
  const submitHandler = async (values) => {
    formik.setSubmitting(true);
    formik.setSubmitting(false);
    handleShowModal();
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
      <Styles.ModalContainer>
        <ModalCancelIcon>
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
        <PrimaryButton
          onClick={() => {
            handleReject();
            handleCloseModal();
          }}
        >
          <Text variant="body" color="text.primary">
            Submit
          </Text>
        </PrimaryButton>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default RejectModal;
