import React, { useEffect, useMemo, useState } from 'react';

import DataTable from 'react-data-table-component';

//Styles
import { DashboardContent, FlexContainer, InputField } from '@/components/UI';
import { InputAdornment } from '@mui/material';

//Icons
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Search } from '@mui/icons-material';

import { featuredDetails } from '@/mockData/mockData';

const ListingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = useState('');

  const filteredReviews = data.filter(
    (item) =>
      item.createdAt.toLowerCase().includes(filterText.toLowerCase()) ||
      item.expiresAt.toLowerCase().includes(filterText.toLowerCase()) ||
      item.currentStatus.toLowerCase().includes(filterText.toLowerCase()) ||
      item.stripeId.toString().includes(filterText) ||
      item.amount.toString().includes(filterText)
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
      selector: (row) => row.createdAt,
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
      selector: (row) => row.expiresAt,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Amount Spent
        </FlexContainer>
      ),
      selector: (row) => row.amount,
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Status
        </FlexContainer>
      ),
      selector: (row) => row.currentStatus,
      center: 'true',
    },
  ];

  useEffect(() => {
    setLoading(true);
    const data = featuredDetails.map((review) => ({
      stripeId: review.stripeId,
      createdAt: review.createdAt,
      expiresAt: review.expiresAt,
      amount: review.amount,
      currentStatus: review.currentStatus,
    }));
    setData(data);
    setLoading(false);
  }, []);

  return (
    <DashboardContent>
      <DataTable
        columns={columns}
        data={filteredReviews}
        responsive
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationPerPage={8}
        paginationRowsPerPageOptions={[8]}
        progressPending={loading}
      />
    </DashboardContent>
  );
};

export default ListingTable;
