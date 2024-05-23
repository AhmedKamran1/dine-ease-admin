import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

// Styles
import { DashboardContent, FlexContainer, Text } from '@/components/UI';
import { Grid } from '@mui/material';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Services
import { getUsersCount } from '@/services';

// Helpers
import { getError } from '@/helpers';

const Cards = ({ restaurants }) => {
  const [users, setUsers] = useState(null);

  const fetchUsersCount = async () => {
    try {
      const response = await getUsersCount();
      setUsers(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchUsersCount();
  }, []);

  const statistics = [
    {
      icon: <PersonIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Users Registered',
      content: users?.userCount || 0,
    },
    {
      icon: <ManageAccountsIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Managers Registered',
      content: users?.managerCount || 0,
    },
    {
      icon: <PersonIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Users Registered',
      content: users?.userCount || 0,
    },
    {
      icon: <RestaurantIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Restaurants Registered',
      content: restaurants.length,
    },
  ];

  return (
    <Grid container columnSpacing={1}>
      {statistics.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <DashboardContent height="170px">
            <FlexContainer sx={{ flexDirection: 'column', height: '100%' }}>
              {item.icon}
              <Text variant="subHeader" mb={0.5}>
                {item.content}
              </Text>
              <Text variant="sub">{item.text}</Text>
            </FlexContainer>
          </DashboardContent>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
