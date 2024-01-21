import { Grid, Box, styled } from '@mui/material';
import {
  NAV_HEIGHT,
  DASHBOARD_DRAWER_FULLWIDTH,
  DASHBOARD_DRAWER_RESPONSIVEWIDTH,
} from '@/utils/constants';

export const FlexContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const PageContainer = styled(Box)({
  minHeight: `clamp(600px,100vh,100vh)`,
});

export const SecondaryContainer = styled(Grid)({
  height: `calc(100vh - ${NAV_HEIGHT}px)`,
  width: '90%',
  margin: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
});

export const SectionContainer = styled(SecondaryContainer)(({ theme }) => ({
  height: 'auto',
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  maxWidth: '500px',
  margin: 'auto',
  gap: theme.spacing(2),
}));

export const DashboardContainer = styled(Grid)(({ theme }) => ({
  marginLeft: `calc(${DASHBOARD_DRAWER_FULLWIDTH}px)`,
  width: `calc(100% - ${DASHBOARD_DRAWER_FULLWIDTH}px)`,
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  height: '100vh',
  overflow: 'auto',

  [theme.breakpoints.down('md')]: {
    marginLeft: `calc(${DASHBOARD_DRAWER_RESPONSIVEWIDTH}px)`,
    width: `calc(100vw - ${DASHBOARD_DRAWER_RESPONSIVEWIDTH}px)`,
  },
}));

export const DashboardContent = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  boxShadow: '0px 0px 10px 1px lightgrey',
  padding: `${theme.spacing(2)} ${theme.spacing(3)} `,

  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1)} `,
  },
}));

export const PageContent = styled(DashboardContent)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(4)} `,
}));
