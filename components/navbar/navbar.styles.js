import { AppBar, styled } from '@mui/material';
import { NAV_HEIGHT } from '@/utils/constants';

export const AppBarContainer = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: `${NAV_HEIGHT}px`,
  width: '100%',
  background: theme.palette.static.primary,
  zIndex: '999',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.static.ternary}`,

  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(4)}`,
  },
}));
