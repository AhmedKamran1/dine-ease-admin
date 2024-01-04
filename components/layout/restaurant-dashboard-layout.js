import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RestaurantContextProvider from '@/context/restaurant-context/restaurant-provider';

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
import ReviewsIcon from '@mui/icons-material/Reviews';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RestaurantLogo from '../restaurant-dashboard/restaurant-logo/restaurant-logo';
import ImageIcon from '@mui/icons-material/Image';

const RestaurantDashboardLayout = ({ children }) => {
  const router = useRouter();

  const value = router.asPath.split('/');
  const [selectedPage, setSelectedPage] = useState(value[value.length - 1]);
  const [open, setOpen] = useState(false);

  const dummyId = 1;

  const dashboardLinks = [
    {
      id: 'overview',
      text: 'Overview',
      icon: <SummarizeIcon />,
    },
    {
      id: 'edit-details',
      text: 'Edit Details',
      icon: <EditNoteIcon />,
    },
    {
      id: 'feature-history',
      text: 'Feature History',
      icon: <MonetizationOnIcon />,
    },
    {
      id: 'reviews',
      text: 'Reviews',
      icon: <ReviewsIcon />,
    },
    {
      id: 'menu',
      text: 'Menu',
      icon: <MenuBookIcon />,
    },
    {
      id: 'logs',
      text: 'Logs',
      icon: <WorkHistoryIcon />,
    },
    {
      id: 'badges',
      text: 'Badges',
      icon: <LocalPoliceIcon />,
    },
    {
      id: 'restaurant-images',
      text: 'Images',
      icon: <ImageIcon />,
    },
  ];

  const handleNavDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <RestaurantContextProvider>
      <CustomDrawer variant="permanent" open={open} onClose={handleNavDrawer}>
        <DrawerIcon onClick={handleNavDrawer} open={open}>
          {open ? (
            <KeyboardArrowLeftIcon color="primary" fontSize="large" />
          ) : (
            <KeyboardArrowRightIcon color="primary" fontSize="large" />
          )}
        </DrawerIcon>
        <RestaurantLogo open={open} />
        <List>
          {dashboardLinks.map((item, index) => (
            <Link href={`/restaurant/dashboard/${dummyId}/${item.id}`} key={item.id}>
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
          <Link href={`/`}>
            <ListItem>
              <DrawerListButton>
                <ListItemIcon>
                  <KeyboardArrowLeftIcon />
                </ListItemIcon>
                <DrawerListText primary={'Go Back'} open={open} />
              </DrawerListButton>
            </ListItem>
          </Link>
        </List>
      </CustomDrawer>
      {children}
    </RestaurantContextProvider>
  );
};

export default RestaurantDashboardLayout;
