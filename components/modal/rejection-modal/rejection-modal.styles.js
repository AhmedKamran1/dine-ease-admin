import { styled } from '@mui/material';
import { ModalContent } from '@/components/UI';

export const ModalContainer = styled(ModalContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  gap: theme.spacing(2),
  width: '600px',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    width: '300px',
    padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
  },
}));
