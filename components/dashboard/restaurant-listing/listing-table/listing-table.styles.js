import { styled } from '@mui/material';
import { FlexContainer, PaddedButton } from '@/components/UI';

export const Option = styled(PaddedButton)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.secondary.main : theme.palette.static.primary,
  color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
}));

export const OptionContainer = styled(FlexContainer)(({ theme }) => ({
  gap: theme.spacing(1),
  justifyContent: 'left',
  marginTop: theme.spacing(2),
}));
