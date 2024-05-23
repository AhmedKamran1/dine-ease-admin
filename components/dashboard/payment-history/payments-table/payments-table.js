import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import DataTable from 'react-data-table-component';

// Styles
import { DashboardContent, FlexContainer, InputField } from '@/components/UI';
import { Chip, InputAdornment } from '@mui/material';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Search from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Helpers
import { getDate } from '@/helpers';

const PaymentsTable = ({ payments }) => {
  const [filterText, setFilterText] = useState('');

  // const calculateTotalAmount = () => {
  //   let sum = 0;
  //   data.forEach((plan) => (sum += plan.planId.charges));
  //   return sum;
  // };

  const filteredPayments = payments?.filter(
    (item) =>
      getDate(item.createdAt).toLowerCase().includes(filterText) ||
      item.stripeId.toString().includes(filterText) ||
      item.restaurantId.name.toString().toLowerCase().includes(filterText) ||
      item.planId.title.toString().toLowerCase().includes(filterText) ||
      item.planId.charges.toString().includes(filterText)
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
      selector: (row) => row.restaurantId.name,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <PersonIcon color="primary" />
          Payment ID
        </FlexContainer>
      ),
      selector: (row) => row.stripeId,
      sortable: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <StarIcon color="primary" />
          Feature Date
        </FlexContainer>
      ),
      selector: (row) => getDate(row.createdAt),
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Expiration Date
        </FlexContainer>
      ),
      selector: (row) =>
        getDate(dayjs(row.createdAt).add(row.planId.durationInMonths, 'month')),
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Charges
        </FlexContainer>
      ),
      selector: (row) => row.planId.charges + `$${row.planId.currency}`,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Status
        </FlexContainer>
      ),
      selector: (row) => (
        <Chip
          label={row.planId.isActive ? 'Active' : 'Expired'}
          color={row.planId.isActive ? 'success' : 'error'}
          sx={{ color: 'text.primary' }}
        />
      ),
      center: 'true',
    },
  ];

  return (
    <DashboardContent>
      <DataTable
        columns={columns}
        data={filteredPayments}
        responsive
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10]}
      />
    </DashboardContent>
  );
};

export default PaymentsTable;
