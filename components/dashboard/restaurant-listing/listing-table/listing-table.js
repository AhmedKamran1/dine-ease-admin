import React, { useEffect, useMemo, useState } from 'react';

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

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Services
import { restaurantStatusUpdate } from '@/services';

const tabSelection = ['Pending', 'Approved', 'Rejected'];

const ListingTable = ({
  pendingRestaurants,
  approvedRestaurants,
  allRestaurants,
  loading,
  refetchData,
}) => {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState('Pending');
  const [filterText, setFilterText] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null);

  const filteredData = data?.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.id.toLowerCase().includes(filterText.toLowerCase()) ||
      item.taxId.toLowerCase().includes(filterText.toLowerCase()) ||
      item.phoneNumber.toString().includes(filterText)
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
          <IconButton onClick={() => handleShowConfirmModal(row.id)}>
            <Tooltip title="Approve Restaurant" placement="top" arrow>
              <CheckCircleIcon color="success" />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleShowRejectModal(row.id)}>
            <Tooltip title="Reject Restaurant" placement="top" arrow>
              <CancelIcon color="error" />
            </Tooltip>
          </IconButton>
        </React.Fragment>
      ),
      center: 'true',
    },
  ];

  const handleShowConfirmModal = (id) => {
    setShowConfirmModal((prevState) => !prevState);
    setRestaurantId(id);
  };

  const handleShowRejectModal = (id) => {
    setShowRejectModal((prevState) => !prevState);
    setRestaurantId(id);
  };

  const restaurantApproveHandler = async () => {
    try {
      const response = await restaurantStatusUpdate(restaurantId, { status: 'approved' });
      // setData((prevState) => prevState.filter((record) => record.id !== restaurantId));
      enqueueSnackbar({
        variant: 'success',
        message: response.data,
      });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      refetchData();
    }
  };

  const restaurantRejectHandler = async (remarks) => {
    try {
      const response = await restaurantStatusUpdate(restaurantId, {
        status: 'rejected',
        remarks: remarks,
      });
      // setData((prevState) => prevState.filter((record) => record.id !== restaurantId));
      enqueueSnackbar({
        variant: 'success',
        message: response.data,
      });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      refetchData();
    }
  };

  const listingHandler = (tab) => {
    switch (tab) {
      case 'Pending':
        setData(pendingRestaurants?.data);
        break;
      case 'Approved':
        setData(approvedRestaurants?.data?.restaurants);
        break;
      case 'Rejected':
        setData(allRestaurants?.data);
        break;
      default:
        setData(allRestaurants?.data);
    }
  };

  useEffect(() => {
    if (!loading) listingHandler(tab);
  }, [tab, loading, approvedRestaurants, pendingRestaurants]);

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
          {tabSelection.map((option) => (
            <Styles.Option
              key={option}
              selected={+option.includes(tab)}
              onClick={() => setTab(option)}
            >
              <Text variant="sub" fontWeight={600}>
                {option}
              </Text>
            </Styles.Option>
          ))}
        </Styles.OptionContainer>
        <Cards
          pendingCount={pendingRestaurants?.data?.length}
          approvedCount={approvedRestaurants?.data?.restaurants.length}
          totalCount={allRestaurants?.data?.length}
        />
        <DataTable
          columns={tab === 'Pending' ? columns : columns.slice(0, -1)}
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
