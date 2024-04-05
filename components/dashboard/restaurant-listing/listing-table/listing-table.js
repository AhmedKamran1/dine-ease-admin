import React, { useEffect, useMemo, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

// Styles
import * as Styles from './listing-table.styles';
import { DashboardContent, FlexContainer, InputField, Text } from '@/components/UI';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';

// Icons
import Search from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BadgeIcon from '@mui/icons-material/Badge';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CallIcon from '@mui/icons-material/Call';

// Component
import DataTable from 'react-data-table-component';
import Cards from '../card/card';
import ConfirmModal from '@/components/modal/confirmation-modal/confirmation-modal';
import RejectModal from '@/components/modal/rejection-modal/rejection-modal';

// Services
import { deleteRestaurant, restaurantStatusUpdate } from '@/services';

// Helpers
import { getError } from '@/helpers';

// Utils
import { Status } from '@/utils/constants';

const ListingTable = ({ allRestaurants, loading, refetchData }) => {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(Status.PENDING);
  const [filterText, setFilterText] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [restaurant, setRestaurant] = useState(null);

  const filteredData = data?.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.id.toLowerCase().includes(filterText.toLowerCase()) ||
      item.taxId.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.phoneNumber?.toString().includes(filterText)
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <InputField
        name="search"
        label="Search"
        variant="outlined"
        placeholder="Search Reviews"
        onChange={(event) => setFilterText(event.target.value)}
        value={filterText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: '300px' }}
      />
    );
  }, [filterText]);

  const columns = [
    {
      name: (
        <FlexContainer gap={0.5}>
          <RestaurantIcon color="primary" />
          Restaurant Name
        </FlexContainer>
      ),
      selector: (row) => row.name,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <BadgeIcon color="primary" />
          Restaurant ID
        </FlexContainer>
      ),
      selector: (row) => row.id,
      sortable: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <FactCheckIcon color="primary" />
          Tax ID
        </FlexContainer>
      ),
      selector: (row) => row.taxId,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CallIcon color="primary" />
          Contact No.
        </FlexContainer>
      ),
      selector: (row) => row.phoneNumber,
      center: 'true',
    },
    {
      selector: (row) => (
        <React.Fragment>
          {Status.PENDING === tab && (
            <IconButton onClick={() => handleShowConfirmModal(row)}>
              <Tooltip title="Approve Restaurant" placement="top" arrow>
                <CheckCircleIcon color="success" />
              </Tooltip>
            </IconButton>
          )}
          <IconButton onClick={() => handleShowRejectModal(row)}>
            <Tooltip title="Reject Restaurant" placement="top" arrow>
              <CancelIcon color="error" />
            </Tooltip>
          </IconButton>
        </React.Fragment>
      ),
      center: 'true',
    },
  ];

  const handleShowConfirmModal = (data) => {
    setShowConfirmModal((prevState) => !prevState);
    setRestaurant(data);
  };

  const handleShowRejectModal = (data) => {
    setShowRejectModal((prevState) => !prevState);
    setRestaurant(data);
  };

  const restaurantApproveHandler = async () => {
    try {
      const response = await restaurantStatusUpdate(restaurant.id, {
        status: 'approved',
      });
      enqueueSnackbar({ variant: 'success', message: response.data });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      refetchData();
    }
  };

  const restaurantRejectHandler = async (remarks) => {
    try {
      let response;
      if (restaurant.status === Status.APPROVED.value) {
        response = await deleteRestaurant(restaurant.id);
      } else {
        response = await restaurantStatusUpdate(restaurant.id, {
          status: 'rejected',
          remarks: remarks,
        });
      }
      enqueueSnackbar({ variant: 'success', message: response.data });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      refetchData();
    }
  };

  const listingHandler = (tab) => {
    setData(allRestaurants[tab.value]);
  };

  useEffect(() => {
    if (!loading) listingHandler(tab);
    // eslint-disable-next-line
  }, [tab, loading, allRestaurants]);

  return (
    <React.Fragment>
      {showConfirmModal && (
        <ConfirmModal
          showModal={showConfirmModal}
          handleCloseModal={handleShowConfirmModal}
          handleConfirm={restaurantApproveHandler}
        />
      )}
      {showRejectModal && (
        <RejectModal
          showModal={showRejectModal}
          handleCloseModal={handleShowRejectModal}
          handleReject={restaurantRejectHandler}
        />
      )}
      <DashboardContent>
        <Text variant="subHeader" fontWeight={500}>
          Restaurant Listings
        </Text>
        <Styles.OptionContainer>
          {Object.values(Status).map((status) => (
            <Styles.Option
              key={status.value}
              selected={status.value === tab.value}
              onClick={() => setTab(status)}
            >
              <Text variant="sub" fontWeight={600}>
                {status.text}
              </Text>
            </Styles.Option>
          ))}
        </Styles.OptionContainer>
        <Cards allRestaurants={allRestaurants} />
        <DataTable
          columns={
            [Status.PENDING, Status.APPROVED].includes(tab)
              ? columns
              : columns.slice(0, -1)
          }
          data={filteredData}
          responsive
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15]}
          progressPending={loading}
        />
      </DashboardContent>
    </React.Fragment>
  );
};

export default ListingTable;
