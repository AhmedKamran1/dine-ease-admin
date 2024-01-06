import { Box, styled } from '@mui/material';

export const Card = styled(Box)(({ theme }) => ({
  width: '250px',
  padding: theme.spacing(2.5),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '10px',
}));
