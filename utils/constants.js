// Icons
import SummarizeIcon from '@mui/icons-material/Summarize';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

export const NAV_HEIGHT = 85;
export const DASHBOARD_DRAWER_FULLWIDTH = 350;
export const DASHBOARD_DRAWER_RESPONSIVEWIDTH = 70;

export const Status = {
  PENDING: { value: 'pending', text: 'Pending' },
  APPROVED: { value: 'approved', text: 'Approved' },
  DELETED: { value: 'deleted', text: 'Deleted' },
};

export const Periods = [
  { id: '30 Days', value: 1 },
  { id: '3 Months', value: 3 },
  { id: '6 Months', value: 6 },
  { id: '1 Year', value: 12 },
];

export const dashboardLinks = [
  {
    id: 'overview',
    text: 'Overview',
    icon: <SummarizeIcon />,
  },
  {
    id: 'restaurant-listing',
    text: 'Restaurant Listings',
    icon: <EditNoteIcon />,
  },
  {
    id: 'modify-request',
    text: 'Modify Requests',
    icon: <MenuBookIcon />,
  },
  {
    id: 'plan',
    text: 'Plan Details',
    icon: <SubscriptionsIcon />,
  },
  {
    id: 'payment',
    text: 'Payment Details',
    icon: <MonetizationOnIcon />,
  },
  {
    id: 'logs',
    text: 'Logs',
    icon: <WorkHistoryIcon />,
  },
];
