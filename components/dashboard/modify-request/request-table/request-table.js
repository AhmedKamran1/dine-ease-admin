import React, { useEffect, useMemo, useRef, useState } from 'react';

// Styles
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { DashboardContent, FlexContainer, InputField } from '@/components/UI';

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
import ConfirmModal from '@/components/modal/confirmation-modal/confirmation-modal';
import DeleteModal from '@/components/modal/delete-modal/delete-modal';

// Helpers
import { getError } from '@/helpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Services
import { deleteRequest, restaurantStatusUpdate, updateRequest } from '@/services';

const RequestTable = ({ requests }) => {
  const [data, setData] = useState(requests);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const restaurantDetails = useRef(null);

  const filteredRequests = data?.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.restaurantId.toLowerCase().includes(filterText.toLowerCase()) ||
      item.taxId.toLowerCase().includes(filterText.toLowerCase()) ||
      item.phoneNumber.toString().includes(filterText)
  );

  useEffect(() => {
    setLoading(true);
    setData(requests);
    setLoading(false);
  }, [requests]);

  const handleShowConfirmModal = (data) => {
    setShowConfirmModal((prevState) => !prevState);
    restaurantDetails.current = data;
  };

  const handleShowDeleteModal = (data) => {
    setShowDeleteModal((prevState) => !prevState);
    restaurantDetails.current = data;
  };

  const approveRequestHandler = async () => {
    try {
      const response = await updateRequest(restaurantDetails.current.restaurantId, {
        status: 'approved',
      });
      console.log(restaurantDetails.current);
      setData((prevState) =>
        prevState.filter(
          (restaurant) =>
            restaurant.restaurantId !== restaurantDetails.current.restaurantId
        )
      );
      enqueueSnackbar({ variant: 'success', message: response.data });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  const deleteRequestHandler = async () => {
    console.log(restaurantDetails.current);
    const response = await deleteRequest(restaurantDetails.current.id);
    setData((prevState) =>
      prevState.filter(
        (restaurant) => restaurant.restaurantId !== restaurantDetails.current.restaurantId
      )
    );
    enqueueSnackbar({ variant: 'success', message: response.data });
  };

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
      selector: (row) => row.restaurantId,
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
          <IconButton onClick={() => handleShowConfirmModal(row)}>
            <Tooltip title="Approve Request" placement="top" arrow>
              <CheckCircleIcon color="success" />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleShowDeleteModal(row)}>
            <Tooltip title="Reject Request" placement="top" arrow>
              <CancelIcon color="error" />
            </Tooltip>
          </IconButton>
        </React.Fragment>
      ),
      center: 'true',
    },
  ];

  return (
    <React.Fragment>
      {showConfirmModal && (
        <ConfirmModal
          showModal={showConfirmModal}
          handleCloseModal={handleShowConfirmModal}
          handleConfirm={approveRequestHandler}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCloseModal={handleShowDeleteModal}
          deleteHandler={deleteRequestHandler}
        />
      )}
      <DashboardContent>
        <DataTable
          columns={columns}
          data={filteredRequests}
          progressPending={loading}
          responsive
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15]}
        />
      </DashboardContent>
    </React.Fragment>
  );
};

export default RequestTable;
