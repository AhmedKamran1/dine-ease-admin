import React from "react";

// Styles
import { Button, Modal } from "@mui/material";
import * as Styles from "./confirmation-modal.styles";
import { FlexContainer, Text } from "@/components/UI";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ConfirmModal = ({ showModal, handleCloseModal, handleConfirm }) => {
  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Styles.ModalContainer>
        <CheckCircleIcon sx={{ fontSize: "6rem" }} color="success" />
        <Text variant="main" fontWeight={800}>
          Accept Confirmation
        </Text>
        <Text variant="body" textAlign="center">
          Are you sure you want to perform this action?
        </Text>
        <FlexContainer gap={2}>
          <Button variant="outlined" onClick={handleCloseModal}>
            <Text variant="body">Cancel</Text>
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleConfirm();
              handleCloseModal();
            }}
          >
            <Text variant="body" color="text.primary">
              Confirm
            </Text>
          </Button>
        </FlexContainer>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default ConfirmModal;
