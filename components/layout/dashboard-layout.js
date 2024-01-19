import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { userActions } from '@/store/user/userSlice';
import { useDispatch } from 'react-redux';

//Styles
import { List, ListItem, ListItemIcon } from '@mui/material';
import {
  DrawerIcon,
  CustomDrawer,
  DrawerListText,
  DrawerListButton,
  DrawerListItem,
} from '../UI';

//Icons
import SummarizeIcon from '@mui/icons-material/Summarize';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const value = router.asPath.split('/');
  const [selectedPage, setSelectedPage] = useState(value[value.length - 1]);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(userActions.logout());
    localStorage.clear();
  };

  const dashboardLinks = [
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
      id: 'logs',
      text: 'Logs',
      icon: <WorkHistoryIcon />,
    },
    {
      id: 'payment',
      text: 'Payments',
      icon: <MonetizationOnIcon />,
    },
  ];

  const handleNavDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <CustomDrawer variant="permanent" open={open} onClose={handleNavDrawer}>
        <DrawerIcon onClick={handleNavDrawer} open={open}>
          {open ? (
            <KeyboardArrowLeftIcon color="primary" fontSize="large" />
          ) : (
            <KeyboardArrowRightIcon color="primary" fontSize="large" />
          )}
        </DrawerIcon>
        <List>
          {dashboardLinks.map((item, index) => (
            <Link href={`/dashboard/${item.id}`} key={item.id}>
              <DrawerListItem>
                <DrawerListButton
                  selected={selectedPage.includes(item.id)}
                  onClick={() => setSelectedPage(item.id)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <DrawerListText primary={item.text} open={open} />
                </DrawerListButton>
              </DrawerListItem>
            </Link>
          ))}
        </List>
        <List sx={{ mt: 'auto', mb: 5 }}>
          <ListItem>
            <DrawerListButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <DrawerListText primary="Logout" open={open} />
            </DrawerListButton>
          </ListItem>
        </List>
      </CustomDrawer>
      {children}
    </React.Fragment>
  );
};

export default DashboardLayout;
