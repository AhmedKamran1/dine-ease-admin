import { styled, Box } from '@mui/material';
import { DashboardContent } from '@/components/UI';

export const PlanContainer = styled(DashboardContent)(({ theme }) => ({
  position: 'relative',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.25s',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    '& *': {
      color: theme.palette.text.primary,
    },
  },
}));

export const Options = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
}));
