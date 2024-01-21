import React from 'react';

// Styles
import * as Styles from './card.styles';
import { FlexContainer, Text } from '@/components/UI';

// Icons
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Utils
import { Status } from '@/utils/constants';

const Cards = ({ allRestaurants }) => {
  const pendingCount = allRestaurants[Status.PENDING.value].length;
  const approvedCount = allRestaurants[Status.APPROVED.value].length;
  const rejectedCount = allRestaurants[Status.REJECTED.value].length;
  const total = approvedCount + rejectedCount;

  const cards = [
    {
      type: Status.PENDING.text,
      count: pendingCount,
      icon: <PendingIcon color="primary" />,
    },
    {
      type: Status.APPROVED.text,
      count: approvedCount,
      icon: <CheckCircleIcon color="primary" />,
    },
    {
      type: Status.REJECTED.text,
      count: rejectedCount,
      icon: <CancelIcon color="primary" />,
    },
    { type: 'Total', count: total, icon: <RestaurantIcon color="primary" /> },
  ];

  return (
    <FlexContainer
      sx={{ gap: 1, flexWrap: 'wrap', justifyContent: 'start', mt: 2, mb: 2 }}
    >
      {cards.map((card) => (
        <Styles.Card key={card.type}>
          <FlexContainer sx={{ justifyContent: 'space-between', mb: 2 }}>
            <Text variant="body" fontWeight={500} color="primary">
              {card.type}
            </Text>
            {card.icon}
          </FlexContainer>
          <Text variant="subHeader" fontWeight={500} color="primary">
            {card.count}
          </Text>
        </Styles.Card>
      ))}
    </FlexContainer>
  );
};

export default Cards;
