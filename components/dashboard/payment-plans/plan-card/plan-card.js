import React from 'react';

// Styles
import * as Styles from './plan-card.styles';
import { IconButton, Tooltip } from '@mui/material';
import { Text } from '@/components/UI';

// Icons
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

const PlanCard = ({ item, openPlanModal, openDeleteModal, planDetails }) => {
  return (
    <Styles.PlanContainer>
      <Text variant="header" sx={{ display: 'block', mb: 2, fontWeight: 500 }}>
        Basic
      </Text>
      <Text variant="body" sx={{ display: 'block', mb: 4 }}>
        This is just a basic plan with basic features to prioritize restaurant searches
      </Text>
      <Text variant="bigHeader" color="primary" fontWeight={900}>
        ${item.charges}
      </Text>
      <Text variant="body" color="primary" fontWeight={600}>
        /{item.durationInMonths} months
      </Text>
      {item.isActive && (
        <Styles.Options>
          <Tooltip title="Update Plan" placement="top" arrow>
            <IconButton
              onClick={() => {
                openPlanModal();
                planDetails.current = item;
              }}
              color="primary"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Plan" placement="top" arrow>
            <IconButton
              onClick={() => {
                openDeleteModal();
                planDetails.current = item;
              }}
              color="primary"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Styles.Options>
      )}
    </Styles.PlanContainer>
  );
};

export default PlanCard;
