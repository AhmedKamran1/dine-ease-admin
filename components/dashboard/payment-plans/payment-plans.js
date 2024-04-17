import React, { useEffect, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

// Styles
import * as Styles from './payment-plans.styles';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { DashboardContainer, FlexContainer, Text } from '@/components/UI';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Services
import { addPlan, deletePlan, getAllPlans, updatePlan } from '@/services';

// Helpers
import { getError } from '@/helpers';

// Components
import PlanModal from './plan-modal/plan-modal';
import DeleteModal from '@/components/modal/delete-modal/delete-modal';
import PaymentsIcon from '@mui/icons-material/Payments';
import PlanCard from './plan-card/plan-card';

const PaymentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const planDetails = useRef(null);

  const fetchPlans = async () => {
    try {
      const response = await getAllPlans();
      setPlans(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const addPlanHandler = async (plan) => {
    try {
      const response = await addPlan(plan);
      enqueueSnackbar({
        variant: 'success',
        message: 'Payment Plan Created',
      });
      setPlans((prevState) => [...prevState, response.data]);
      planDetails.current = null;
    } catch (e) {
      enqueueSnackbar({
        variant: 'error',
        message: getError(e),
      });
    }
  };

  const updatePlanHandler = async (plan) => {
    try {
      const response = await updatePlan(planDetails.current.id, plan);
      enqueueSnackbar({
        variant: 'success',
        message: 'Payment Plan Updated',
      });
      const updatedPlans = [...plans];
      const updateIndex = updatedPlans.findIndex(
        (plan) => plan.id === planDetails.current.id
      );
      updatedPlans[updateIndex] = response.data;
      setPlans(updatedPlans);
      planDetails.current = null;
    } catch (e) {
      enqueueSnackbar({
        variant: 'error',
        message: getError(e),
      });
    }
  };

  const deletePlanHandler = async () => {
    const response = await deletePlan(planDetails.current.id);
    enqueueSnackbar({
      variant: 'success',
      message: response.data,
    });
    const updatedPlans = [...plans];
    const updateIndex = updatedPlans.findIndex(
      (plan) => plan.id === planDetails.current.id
    );
    updatedPlans[updateIndex].isActive = false;
    setPlans(updatedPlans);
    planDetails.current = null;
  };

  const countActivePlans = (plans) => {
    let activeCount = 0;
    for (const plan of plans) {
      if (plan.isActive) {
        activeCount++;
      }
    }
    return activeCount;
  };

  const activePlanCount = countActivePlans(plans);

  return (
    <React.Fragment>
      {showPlanModal && (
        <PlanModal
          showModal={showPlanModal}
          handleCloseModal={() => setShowPlanModal(false)}
          addPlanHandler={addPlanHandler}
          updatePlanHandler={updatePlanHandler}
          plan={planDetails.current}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCloseModal={() => setShowDeleteModal(false)}
          deleteHandler={deletePlanHandler}
        />
      )}

      <DashboardContainer container columnSpacing={1} rowGap={1}>
        <Grid item xs={12}>
          <Styles.Header variant="subHeader">Active Plans</Styles.Header>
        </Grid>
        {plans.every((plan) => plan.isActive === false) && (
          <Grid item xs={12}>
            <FlexContainer mt={3} mb={3} gap={2}>
              <PaymentsIcon fontSize="large" color="primary" />
              <Text variant="main">Currently No Active Plans</Text>
            </FlexContainer>
          </Grid>
        )}
        {plans.map(
          (plan) =>
            plan.isActive && (
              <Grid item xs={12} sm={6} md={3} key={plan.id}>
                <PlanCard
                  item={plan}
                  openPlanModal={() => setShowPlanModal(true)}
                  openDeleteModal={() => setShowDeleteModal(true)}
                  planDetails={planDetails}
                />
              </Grid>
            )
        )}
        <Grid item xs={12}>
          <Styles.Header variant="subHeader">Deleted Plans</Styles.Header>
        </Grid>
        {plans.every((plan) => plan.isActive === true) && (
          <Grid item xs={12}>
            <FlexContainer mt={3} mb={3} gap={2}>
              <PaymentsIcon fontSize="large" color="primary" />
              <Text variant="main">Currently No Deleted Plans</Text>
            </FlexContainer>
          </Grid>
        )}
        {plans.map(
          (plan) =>
            !plan.isActive && (
              <Grid item xs={12} sm={6} md={3} key={plan.id}>
                <PlanCard item={plan} />
              </Grid>
            )
        )}
        <Tooltip
          open={activePlanCount >= 3}
          title="Maximum 3 Plans can be active at a time."
          placement="top"
          arrow
        >
          <Styles.DeletePopper open={true}>
            <IconButton
              color="primary"
              size="large"
              sx={{ borderRadius: 0 }}
              onClick={() => setShowPlanModal(true)}
              disabled={activePlanCount >= 3}
            >
              <AddCircleOutlineIcon sx={{ mr: 1 }} />
              <Text variant="body">Add Plan</Text>
            </IconButton>
          </Styles.DeletePopper>
        </Tooltip>
      </DashboardContainer>
    </React.Fragment>
  );
};

export default PaymentPlans;
